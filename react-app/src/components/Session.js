import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
        sessionName,
        setSessionName,
        users,
        setUsers,
    } = useSession({ sessionId, userId });

    const { makeWebsocket } = useContext(websocketContext);
    const ws = useRef();
    const [isConnectionOpen, setConnectionOpen] = useState(false);

    useEffect(() => {
        if (username === undefined || sessionId === undefined) return;
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
            console.log(message);
            if (message.type === "heartbeat") {
                ws.current.heartbeat();
            } else if (message.type === "resetVoting") {
                // setVotes([]);
                setResetVoting(true);
                setShowVotes(false);
                const newMessages = [...messages];
                newMessages.push({
                    text: `Voting reset`,
                    type: "default",
                    id: uuid(),
                });
                setMessages(newMessages);
            } else if (message.type === "vote") {
                if (message.vote.userid === userId) return;
                const newUsers = [...users];
                const userIndex = newUsers.findIndex((user) => {
                    return user.userid === message.vote.userid;
                });
                newUsers[userIndex].votevalue = message.vote.votevalue;
                setUsers(newUsers);
                const newMessages = [...messages];
                newMessages.push({
                    text: `${message.vote.username} voted`,
                    type: "ok",
                    id: uuid(),
                });
                setMessages(newMessages);
            } else if (message.type === "connect") {
                if (message.userId === userId) return;
                const newMessages = [...messages];
                newMessages.push({
                    text: `${message.username} joined`,
                    type: "ok",
                    id: uuid(),
                });
                setMessages(newMessages);
            } else if (message.type === "showVotes") {
                setShowVotes(true);
                const newMessages = [...messages];
                newMessages.push({
                    text: `Votes shown`,
                    type: "default",
                    id: uuid(),
                });
                setMessages(newMessages);
            } else {
                console.warn("Unrecognized message type - " + message.type);
            }
        };

        return () => {
            ws.close();
        };
    }, []);

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
        sessionName,
        setSessionName,
        sessionId,
        users,
        setUsers,
    };

    return (
        <>
            {sessionName && (
                <SessionContext.Provider value={sessionContextValue}>
                    <Container>
                        <Row className="h-auto">
                            <Col>
                                <div className="mb-3">
                                    <h3>{sessionName}</h3>
                                    {/* Host: {sessionData && <p>{sessionData.hostid}</p>} */}
                                </div>
                            </Col>
                        </Row>
                        <Row className="h-75" xs={1} md={2}>
                            <Col md={8} className="mb-3">
                                <Row className="g-4">
                                    <VoteButton voteValue={1} websocket={ws} />
                                    <VoteButton voteValue={2} websocket={ws} />
                                    <VoteButton voteValue={3} websocket={ws} />
                                    <VoteButton voteValue={5} websocket={ws} />
                                    <VoteButton voteValue={8} websocket={ws} />
                                    <VoteButton voteValue={13} websocket={ws} />
                                    <VoteButton voteValue={21} websocket={ws} />
                                </Row>
                            </Col>
                            <Col md={4}>
                                <VotesColumn
                                    users={users}
                                    setUsers={setUsers}
                                    websocket={ws}
                                    showVotes={showVotes}
                                    setShowVotes={setShowVotes}
                                />
                            </Col>
                        </Row>
                        <Notifications messages={messages} />
                    </Container>
                </SessionContext.Provider>
            )}
        </>
    );
}
