import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VoteButton from "./VoteButton";
import VotesColumn from "./VotesColumn";
import { authContext } from "../contexts/Auth";
import { useSession } from "../models/session";
import { websocketContext } from "../contexts/Websocket";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const SessionContext = React.createContext();

export function Session() {
    const sessionId = useParams().session_id;
    const { username, setRegisterModal, userId } = useContext(authContext);

    const [websocket, setWebsocket] = useState();
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
    // const [votes, setVotes] = useVotes({ sessionId });

    const { makeWebsocket } = useContext(websocketContext);

    useEffect(() => {
        async function setupWebsocket() {
            if (username === undefined || sessionId === undefined) return;
            const ws = await makeWebsocket({ sessionId, username });
            ws.onmessage = (messageString) => {
                const message = JSON.parse(messageString.data);
                if (message.type === "heartbeat") {
                    ws.heartbeat();
                } else if (message.type === "resetVoting") {
                    // setVotes([]);
                    setResetVoting(true);
                    setShowVotes(false);
                } else if (message.type === "vote") {
                    if (message.vote.userid === userId) return;
                    // setVotes((prevVotes) => {
                    //     for (let i = 0; i < prevVotes.length; i++) {
                    //         if (prevVotes[i].userid === message.vote.userid) {
                    //             prevVotes[i].votevalue = message.vote.votevalue;
                    //             console.log(prevVotes);
                    //             return [...prevVotes];
                    //         }
                    //     }
                    //     return [...prevVotes, message.vote];
                    // });
                } else if (message.type === "connect") {
                    // this part is wrong because it will automatically add this to the db, it needs to be on setting up the ws
                } else if (message.type === "showVotes") {
                    setShowVotes(true);
                } else {
                    console.warn("Unrecognized message type - " + message.type);
                }
            };
            setWebsocket(ws);
        }
        setupWebsocket();
    }, [
        username,
        makeWebsocket,
        // setVotes,
        sessionId,
        setResetVoting,
        setShowVotes,
    ]);

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
                                    <VoteButton
                                        voteValue={1}
                                        // votes={votes}
                                        // setVotes={setVotes}
                                        websocket={websocket}
                                    />
                                    <VoteButton
                                        voteValue={2}
                                        // votes={votes}
                                        // setVotes={setVotes}
                                        websocket={websocket}
                                    />
                                    <VoteButton
                                        voteValue={3}
                                        // votes={votes}
                                        // setVotes={setVotes}
                                        websocket={websocket}
                                    />
                                    <VoteButton
                                        voteValue={5}
                                        // votes={votes}
                                        // setVotes={setVotes}
                                        websocket={websocket}
                                    />
                                    <VoteButton
                                        voteValue={8}
                                        // votes={votes}
                                        // setVotes={setVotes}
                                        websocket={websocket}
                                    />
                                </Row>
                            </Col>
                            <Col md={4}>
                                <VotesColumn
                                    // votes={votes}
                                    users={users}
                                    setUsers={setUsers}
                                    // setVotes={setVotes}
                                    websocket={websocket}
                                    showVotes={showVotes}
                                    setShowVotes={setShowVotes}
                                />
                            </Col>
                        </Row>
                    </Container>
                </SessionContext.Provider>
            )}
        </>
    );
}
