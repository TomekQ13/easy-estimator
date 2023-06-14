import React, { useContext } from "react";
import uuid from "react-uuid";
import { SessionContext } from "./Session";
import { authContext } from "../contexts/Auth";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useMakeVote } from "../models/vote";

export default function VoteButton({ voteValue, websocket }) {
    const { sessionId, users, setUsers } = useContext(SessionContext);
    const { username, userId } = useContext(authContext);
    const [vote, resp] = useMakeVote();

    async function handleClick() {
        const voteBody = {
            sessionid: sessionId,
            userid: userId,
            votevalue: voteValue,
            username,
        };
        const newUsers = [...users];
        const userIndex = newUsers.findIndex((user) => {
            return user.userid === userId;
        });
        newUsers[userIndex].votevalue = voteValue;

        vote({
            sessionId: sessionId,
            userId: voteBody.userid,
            voteValue: voteBody.votevalue,
        });
        websocket.send(
            JSON.stringify({
                type: "vote",
                vote: voteBody,
                sessionId: sessionId,
            })
        );
        setUsers(newUsers);
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
