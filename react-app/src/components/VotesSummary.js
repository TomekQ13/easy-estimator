import React, { useEffect } from "react";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";

export default function VotesSummary({ users, showVotes, mean, setMean }) {
    useEffect(() => {
        const votesValues = [];
        users.forEach((user) => {
            votesValues.push(user.votevalue);
        });
        const mean = calculateMean(votesValues);
        if (mean === undefined) return;
        setMean(mean);
    }, [users]);

    function calculateMean(votesValues) {
        if (votesValues.length === 0 || votesValues.length === undefined)
            return undefined;
        const sum = votesValues.reduce((prevSum, i) => prevSum + i, 0);
        return sum / votesValues.length;
    }

    return (
        <div>
            <h3>Summary</h3>
            <ListGroup>
                <ListGroupItem className="mb-2">
                    <span>Mean</span>
                    <span className="float-end">
                        {users.length === 0
                            ? ""
                            : showVotes === true
                            ? mean
                            : "?"}
                    </span>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
}
