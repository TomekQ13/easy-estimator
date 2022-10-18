import React, { useContext } from "react";
import uuid from "react-uuid";
import { SessionContext } from "./Session";
import { authContext } from "../contexts/Auth";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useMakeVote } from "../models/vote";

export default function VoteButton({ voteValue, votes, setVotes, websocket }) {
    const { sessionData } = useContext(SessionContext);
    const { username } = useContext(authContext);
    const [vote, resp] = useMakeVote();

    async function handleClick() {
        const voteId = uuid();
        const voteBody = {
            sessionid: sessionData.sessionid,
            voteid: voteId,
            userid: username,
            votevalue: voteValue,
        };
        const newVotes = [...votes];
        // this will cause the new vote to always be placed at the bottom
        const notThisUserVotes = newVotes.filter(
            (vote) => vote.userid !== username
        );
        notThisUserVotes.push(voteBody);

        vote({
            sessionId: voteBody.sessionid,
            voteId: voteBody.voteid,
            username,
            voteValue: voteBody.votevalue,
        });
        websocket.send(
            JSON.stringify({
                type: "vote",
                vote: voteBody,
            })
        );
        setVotes(notThisUserVotes);
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
