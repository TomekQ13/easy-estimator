import React, { useEffect, useState } from "react";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";

export default function VotesSummary({ users, showVotes }) {
    const [mean, setMean] = useState();
    const [median, setMedian] = useState();

    useEffect(() => {
        const votesValues = [];
        users.forEach((user) => {
            votesValues.push(user.votevalue);
        });
        const mean = calculateMean(votesValues);
        const median = calculateMedian(votesValues);
        if (mean === undefined || median === undefined) return;
        setMean(mean);
        setMedian(median);
    }, [users]);

    function calculateMean(votesValues) {
        if (votesValues.length === 0 || votesValues.length === undefined)
            return undefined;
        const sum = votesValues.reduce((prevSum, i) => prevSum + i, 0);
        return sum / votesValues.length;
    }

    function calculateMedian(arr) {
        if (arr.length === 0 || arr.length === undefined) return undefined;
        if (arr.length == 0) {
            return; // 0.
        }
        arr.sort((a, b) => a - b); // 1.
        const midpoint = Math.floor(arr.length / 2); // 2.
        const median =
            arr.length % 2 === 1
                ? arr[midpoint] // 3.1. If odd length, just take midpoint
                : (arr[midpoint - 1] + arr[midpoint]) / 2; // 3.2. If even length, take median of midpoints
        return median;
    }

    function show({ value }) {
        return users.length === 0 ? "" : showVotes === true ? mean : "?";
    }

    return (
        <div className="mb-2">
            <h3>Summary</h3>
            <ListGroup>
                <ListGroupItem className="">
                    <span>Mean</span>
                    <span className="float-end">{show({ value: mean })}</span>
                </ListGroupItem>
                <ListGroupItem className="">
                    <span>Median</span>
                    <span className="float-end">{show({ value: median })}</span>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
}
