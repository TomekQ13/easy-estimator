import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VoteButton from "./VoteButton";
import VotesColumn from "./VotesColumn";
import { authContext } from "../contexts/Auth";
import { useSession } from "../models/session";
import { getVotes } from "../models/vote";
import { websocketContext } from "../contexts/Websocket";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";

export const SessionContext = React.createContext();

export function Session() {
    const sessionId = useParams().session_id;
    // const [sessionData, setSessionData] = useState({
    //     params: { showVotes: undefined },
    // });
    const [votes, setVotes] = useState([]);
    const [websocket, setWebsocket] = useState();
    const [showVotes, setShowVotes] = useState(false);
    const [sessionData, setSessionData] = useSession(sessionId);

    // const [activeUsers, setActiveUsers] = useState([]);

    const {
        username,
        accessToken,
        refreshToken,
        setAccessToken,
        setRegisterModal,
    } = useContext(authContext);
    const { makeWebsocket } = useContext(websocketContext);

    useEffect(async () => {
        if (username === undefined) return;
        const ws = await makeWebsocket(username);
        ws.onmessage = (messageString) => {
            const message = JSON.parse(messageString.data);
            if (message.type === "heartbeat") {
                ws.heartbeat();
            } else if (message.type === "resetVoting") {
                setVotes([]);
                const newSessionData = { ...sessionData };
                newSessionData.params.showVotes = false;
                setSessionData(newSessionData);
            } else if (message.type === "vote") {
                if (message.vote.userid === username) return;
                setVotes((prevVotes) => {
                    const notThisUserVotes = prevVotes.filter(
                        (vote) => vote.userid !== message.vote.userid
                    );
                    return [...notThisUserVotes, message.vote];
                });
                // } else if (message.type === "usernames") {
                //     // setActiveUsers(message.usernames);
            } else if (message.type === "showVotes") {
                const newSessionData = { ...sessionData };
                newSessionData.params.showVotes = true;
                setSessionData(newSessionData);
            } else {
                console.warn("Unrecognized message type - " + message.type);
            }
        };
        setWebsocket(ws);
    }, [username]);

    useEffect(() => {
        if (username === null || username === undefined) {
            setRegisterModal({ show: true });
        }
    }, [setRegisterModal, username]);

    // useEffect(() => {
    //     if (accessToken === undefined) return;
    //     getSession({
    //         sessionId,
    //         accessToken,
    //         refreshToken,
    //         setAccessTokenFunction: setAccessToken,
    //     }).then((sessionData) => {
    //         if (sessionData === null) return;
    //         console.log(sessionData);
    //         setSessionData(sessionData);
    //         setShowVotes(sessionData.showVotes === true ? true : false);
    //     });
    // }, [sessionId, accessToken, refreshToken, setAccessToken]);

    useEffect(() => {
        if (accessToken === undefined) return;
        getVotes({
            sessionId,
            accessToken,
            refreshToken,
            setAccessTokenFunction: setAccessToken,
        }).then((sessionVotes) => {
            setVotes(sessionVotes);
        });
    }, [sessionId, accessToken, refreshToken, setAccessToken]);

    const sessionContextValue = {
        sessionId,
        sessionData,
        setSessionData,
    };

    return (
        <>
            {sessionData && (
                <SessionContext.Provider value={sessionContextValue}>
                    <Navbar bg="light">
                        <Container>
                            <Navbar.Brand>Easy Estimator</Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Container>
                        <Row className="h-auto">
                            <Col>
                                <div>
                                    SessionId:{" "}
                                    {sessionData && (
                                        <p>{sessionData.sessionid}</p>
                                    )}
                                    {/* Host: {sessionData && <p>{sessionData.hostid}</p>} */}
                                </div>
                            </Col>
                        </Row>
                        <Row className="h-75" xs={1} md={2}>
                            <Col md={8}>
                                <Row className="g-4">
                                    <VoteButton
                                        voteValue={1}
                                        votes={votes}
                                        setVotes={setVotes}
                                        websocket={websocket}
                                    />
                                    <VoteButton
                                        voteValue={2}
                                        votes={votes}
                                        setVotes={setVotes}
                                        websocket={websocket}
                                    />
                                    <VoteButton
                                        voteValue={3}
                                        votes={votes}
                                        setVotes={setVotes}
                                        websocket={websocket}
                                    />
                                    <VoteButton
                                        voteValue={5}
                                        votes={votes}
                                        setVotes={setVotes}
                                        websocket={websocket}
                                    />
                                    <VoteButton
                                        voteValue={8}
                                        votes={votes}
                                        setVotes={setVotes}
                                        websocket={websocket}
                                    />
                                </Row>
                            </Col>
                            <Col md={4}>
                                <VotesColumn
                                    votes={votes}
                                    setVotes={setVotes}
                                    websocket={websocket}
                                    sessionData={sessionData}
                                    setSessionData={setSessionData}
                                />
                            </Col>
                        </Row>
                    </Container>
                </SessionContext.Provider>
            )}
        </>
    );
}
