import React, { useState } from "react";
import ResetVotesBtn from "./ResetVotesBtn";
import ListGroup from "react-bootstrap/ListGroup";
import VotesSummary from "./VotesSummary";
import ShowVotesBtn from "./ShowVotesBtn";

export default function VotesColumn({
    votes,
    setVotes,
    websocket,
    showVotes,
    setShowVotes,
}) {
    const [mean, setMean] = useState();

    return (
        <div>
            <h3>Votes</h3>
            <ListGroup className="votes-list-box mb-2">
                {votes &&
                    votes.map((vote) => {
                        // this part needs to be adjusted so that there are users and votes are updated for users
                        return (
                            <ListGroup.Item key={vote.voteid}>
                                <div className="d-flex justify-content-between">
                                    <div className="username-box">
                                        {vote.userid}
                                    </div>
                                    <div className="align-self-center mx-2">
                                        {showVotes === true
                                            ? vote.votevalue
                                            : "?"}
                                    </div>
                                </div>
                            </ListGroup.Item>
                        );
                    })}
            </ListGroup>
            <VotesSummary
                votes={votes}
                showVotes={showVotes}
                mean={mean}
                setMean={setMean}
            />
            <div className="float-end">
                <ShowVotesBtn websocket={websocket} />
                <ResetVotesBtn
                    setVotes={setVotes}
                    websocket={websocket}
                    setMean={setMean}
                    setShowVotes={setShowVotes}
                />
            </div>
        </div>
    );
}
