import React from "react";
import ResetVotesBtn from "./ResetVotesBtn";
import ListGroup from "react-bootstrap/ListGroup";
import VotesSummary from "./VotesSummary";
import ShowVotesBtn from "./ShowVotesBtn";
import UsernameBox from "./UsernameBox";

export default function VotesColumn({
    websocket,
    showVotes,
    setShowVotes,
    users,
}) {
    console.log(users);
    return (
        <div>
            <div>
                <h3 className="">Votes</h3>
                <ListGroup className="mb-2">
                    {users &&
                        users.map((user) => {
                            // this part needs to be adjusted so that there are users and votes are updated for users
                            return (
                                <ListGroup.Item key={user.userid}>
                                    <div className="d-flex justify-content-between">
                                        <UsernameBox
                                            username={user.username}
                                            userId={user.userid}
                                        />
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
            </div>
            <div>
                <VotesSummary
                    users={users}
                    showVotes={showVotes}
                    setShowVotes={setShowVotes}
                />
                <div className="button-box">
                    <ShowVotesBtn websocket={websocket} />
                    <ResetVotesBtn
                        websocket={websocket}
                        setShowVotes={setShowVotes}
                    />
                </div>
            </div>
        </div>
    );
}
