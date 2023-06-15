import React, { useState } from "react";
import ResetVotesBtn from "./ResetVotesBtn";
import ListGroup from "react-bootstrap/ListGroup";
import VotesSummary from "./VotesSummary";
import ShowVotesBtn from "./ShowVotesBtn";

export default function VotesColumn({
    websocket,
    showVotes,
    setShowVotes,
    users,
    setUsers,
}) {
    const [mean, setMean] = useState();
    return (
        <div>
            <h3>Votes</h3>
            <ListGroup className="votes-list-box mb-2">
                {users &&
                    users.map((user) => {
                        // this part needs to be adjusted so that there are users and votes are updated for users
                        return (
                            <ListGroup.Item key={user.userid}>
                                <div className="d-flex justify-content-between">
                                    <div className="username-box">
                                        {user.username}
                                    </div>
                                    <div className="align-self-center mx-2">
                                        {user.votevalue !== null
                                            ? showVotes === true
                                                ? user.votevalue
                                                : "?"
                                            : ""}
                                    </div>
                                </div>
                            </ListGroup.Item>
                        );
                    })}
            </ListGroup>
            <VotesSummary
                users={users}
                showVotes={showVotes}
                mean={mean}
                setMean={setMean}
            />
            <div className="float-end">
                <ShowVotesBtn websocket={websocket} />
                <ResetVotesBtn
                    websocket={websocket}
                    setMean={setMean}
                    setShowVotes={setShowVotes}
                />
            </div>
        </div>
    );
}
