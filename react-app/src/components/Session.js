import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VoteButton from "./VoteButton";
import VotesColumn from "./VotesColumn";
import { authContext } from "../contexts/Auth";
import { useSession } from "../models/session";
import { websocketContext } from "../contexts/Websocket";
import Notifications from "./Notifications";
import uuid from "react-uuid";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const SessionContext = React.createContext();

export function Session() {
    const sessionId = useParams().session_id;
    const { username, setRegisterModal, userId } = useContext(authContext);
    const [messages, setMessages] = useState([]);

    const {
        showVotes,
        setShowVotes,
        resetVoting,
        setResetVoting,
        setSessionName,
        users,
        setUsers,
    } = useSession({ sessionId, userId });

    const { makeWebsocket } = useContext(websocketContext);
    const ws = useRef();
    const [isConnectionOpen, setConnectionOpen] = useState(false);
    const navigate = useNavigate();

    function updateUserVote({ userId, newVoteValue }) {
        setUsers((prevUsers) => {
            const newUsers = [...prevUsers];
            const userIndex = newUsers.findIndex((user) => {
                return user.userid === userId;
            });
            // done to avoid crashing the app by removed users voting at the same time
            if (userIndex > -1) {
                newUsers[userIndex].votevalue = newVoteValue;
                return newUsers;
            }
            return [...prevUsers];
        });
    }

    function resetUsersVotes() {
        setUsers((prevUsers) => {
            const newUsers = [...prevUsers];
            newUsers.map((user) => {
                user.votevalue = null;
            });
            return newUsers;
        });
    }

    function addMessage({ newMessage }) {
        setMessages((prevMessages) => {
            const newMessages = [...prevMessages];
            if (newMessages.length >= 5) {
                newMessages.pop();
            }
            return [newMessage, ...newMessages];
        });
    }

    function removeUser({ userId }) {
        setUsers((prevUsers) => {
            const newUsers = [...prevUsers];
            const filteredUsers = newUsers.filter((user) => {
                return user.userid != userId;
            });
            return filteredUsers;
        });
    }

    function addUser({ newUser }) {
        // skip adding new user if the user already exists
        let userExistCheck;

        setUsers((prevUsers) => {
            userExistCheck = prevUsers.filter((user) => {
                return user.userid === newUser.userid;
            });
            if (userExistCheck.length > 0) return prevUsers;
            else return [...prevUsers, newUser];
        });

        if (userExistCheck.length === 0) return true;
        else return false;
    }

    useEffect(() => {
        if (
            username === undefined ||
            sessionId === undefined ||
            userId === undefined
        )
            return;
        ws.current = makeWebsocket();
        ws.current.onopen = () => {
            console.log("Connection opened");
            ws.current.send(
                JSON.stringify({
                    type: "connect",
                    sessionId,
                    username,
                    userId,
                })
            );
            setConnectionOpen(true);
        };
        ws.current.onmessage = (messageString) => {
            const message = JSON.parse(messageString.data);
            if (message.type === "heartbeat") {
                ws.current.heartbeat();
            } else if (message.type === "resetVoting") {
                setResetVoting(true);
                setShowVotes(false);
                resetUsersVotes();
                const newMessage = {
                    text: `Voting reset`,
                    type: "default",
                    id: uuid(),
                };
                addMessage({ newMessage });
            } else if (message.type === "vote") {
                updateUserVote({
                    userId: message.vote.userid,
                    newVoteValue: message.vote.votevalue,
                });
                const newMessage = {
                    text: `${message.vote.username} voted`,
                    type: "success",
                    id: uuid(),
                };
                addMessage({ newMessage });
            } else if (message.type === "connect") {
                if (message.userId === userId) return;
                const userAdded = addUser({
                    newUser: {
                        userid: message.userId,
                        username: message.username,
                        votevalue: null,
                    },
                });
                if (userAdded === true) {
                    const newMessage = {
                        text: `${message.username} joined`,
                        type: "success",
                        id: uuid(),
                    };
                    addMessage({ newMessage });
                }
            } else if (message.type === "showVotes") {
                setShowVotes(true);
                const newMessage = {
                    text: `Votes shown`,
                    type: "default",
                    id: uuid(),
                };
                addMessage({ newMessage });
            } else if (message.type === "disconnect") {
                /*const newMessage = {
                    text: `${message.username} disconnected`,
                    type: "error",
                    id: uuid(),
                };
                deleteUserSessionFunction({ sessionId, userId });
                removeUser({ userId: message.userId });
                addMessage({ messages, setMessages, newMessage });*/
            } else if (message.type === "remove") {
                console.log(message);
                if (message.userId === userId) {
                    console.log("navigating");
                    return navigate(`/`);
                }
                console.log("got here asd");
                const newMessage = {
                    text: `${message.username} removed`,
                    type: "error",
                    id: uuid(),
                };
                addMessage({ newMessage });
                console.log("got here");
            } else {
                console.warn("Unrecognized message type - " + message.type);
            }
        };

        // return () => {
        //     console.log("Closing connection to ws");
        //     ws.current.close();
        // };
    }, [username, sessionId, userId]);

    useEffect(() => {
        if (username === null || username === undefined) {
            setRegisterModal({ show: true, sessionId: sessionId });
        }
    }, [setRegisterModal, username, sessionId]);

    const sessionContextValue = {
        showVotes,
        setShowVotes,
        resetVoting,
        setResetVoting,
        setSessionName,
        sessionId,
        users,
        setUsers,
        removeUser,
        ws: ws.current,
    };

    return (
        <>
            {sessionId && (
                <SessionContext.Provider value={sessionContextValue}>
                    <Container>
                        <Row className="h-auto">
                            <Col>
                                <div className="mb-3">
                                    <h3>Session ID: {sessionId}</h3>
                                    {/* Host: {sessionData && <p>{sessionData.hostid}</p>} */}
                                </div>
                            </Col>
                        </Row>
                        <Row className="h-75" xs={1} md={2}>
                            <Col md={8} className="mb-3">
                                <Row className="g-4">
                                    {[1, 2, 3, 5, 8, 13, 21].map((value) => {
                                        return (
                                            <VoteButton
                                                voteValue={value}
                                                websocket={ws.current}
                                                key={value}
                                            />
                                        );
                                    })}
                                </Row>
                            </Col>
                            <Col md={4}>
                                <VotesColumn
                                    users={users}
                                    setUsers={setUsers}
                                    websocket={ws.current}
                                    showVotes={showVotes}
                                    setShowVotes={setShowVotes}
                                />
                            </Col>
                        </Row>
                    </Container>
                    <Notifications messages={messages} />
                </SessionContext.Provider>
            )}
        </>
    );
}
