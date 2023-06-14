import React, { useEffect } from "react";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";

export default function VotesSummary({ votes, showVotes, mean, setMean }) {
    // useEffect(() => {
    //     const votesValues = [];
    //     votes.forEach((vote) => {
    //         votesValues.push(vote.votevalue);
    //     });
    //     const mean = calculateMean(votesValues);
    //     if (mean === undefined) return;
    //     setMean(mean);
    // }, [votes]);

    // function calculateMean(votesValues) {
    //     if (votesValues.length === 0 || votesValues.length === undefined)
    //         return undefined;
    //     const sum = votesValues.reduce((prevSum, i) => prevSum + i, 0);
    //     return sum / votesValues.length;
    // }

    return (
        <div>
            <h3>Summary</h3>
            <ListGroup>
                <ListGroupItem className="mb-2">
                    <span>Mean</span>
                    <span className="float-end">
                        {/* {votes.length === 0
                            ? ""
                            : showVotes === true
                            ? mean
                            : "?"} */}
                    </span>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
}
