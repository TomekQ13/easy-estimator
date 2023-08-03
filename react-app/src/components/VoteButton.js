import React, { useContext } from "react";
import uuid from "react-uuid";
import { SessionContext } from "./Session";
import { authContext } from "../contexts/Auth";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useMakeVote } from "../models/vote";

export default function VoteButton({ voteValue }) {
    const { sessionId, addMessage, ws } = useContext(SessionContext);
    const { username, userId } = useContext(authContext);
    const [vote, resp] = useMakeVote();

    async function handleClick() {
        const voteBody = {
            sessionid: sessionId,
            userid: userId,
            votevalue: voteValue,
            username,
        };
        try {
            ws.sendMessage({
                type: "vote",
                vote: voteBody,
                sessionId: sessionId,
            });
            vote({
                sessionId: sessionId,
                userId: voteBody.userid,
                voteValue: voteBody.votevalue,
            });
        } catch {
            const newMessage = {
                text: `Connection lost. Please refresh the page.`,
                type: "error",
                id: uuid(),
            };
            addMessage({ newMessage });
        }
    }

    return (
        <Col className="">
            <Button
                onClick={handleClick}
                variant="outline-primary"
                className="vote-btn"
                size="lg"
            >
                <span className="vote-btn-font-size">{voteValue}</span>
            </Button>
        </Col>
    );
}
