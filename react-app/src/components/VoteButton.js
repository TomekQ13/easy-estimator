import React, { useContext } from "react";
import uuid from "react-uuid";
import { SessionContext } from "./Session";
import { authContext } from "../contexts/Auth";
import { makeApiCallFunction } from "../apiAccess/makeCall";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export default function VoteButton({ voteValue, votes, setVotes, websocket }) {
    const { sessionData } = useContext(SessionContext);
    const { username, accessToken, refreshToken, setAccessToken } =
        useContext(authContext);

    function handleClick() {
        const voteId = uuid();
        const voteBody = {
            sessionid: sessionData.sessionid,
            voteid: voteId,
            userid: username,
            votevalue: voteValue,
        };
        const newVotes = [...votes];
        // this will cause the new vote to always be placed at te bottom
        const notThisUserVotes = newVotes.filter(
            (vote) => vote.userid !== username
        );
        notThisUserVotes.push(voteBody);

        websocket.send(
            JSON.stringify({
                type: "vote",
                vote: voteBody,
            })
        );
        setVotes(notThisUserVotes);
        vote(voteBody);
    }

    async function vote(voteBody) {
        if (username === undefined || username === null)
            return console.error("Username not found");
        makeApiCallFunction({
            url: `/vote/${sessionData.sessionid}`,
            method: "PUT",
            body: voteBody,
            accessToken: accessToken,
            refreshToken: refreshToken,
            setAccessTokenFunction: setAccessToken,
        })();
        // const resp = await voteFunction()
        // const voteResponseData = await resp.json()

        // return voteResponseData
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
