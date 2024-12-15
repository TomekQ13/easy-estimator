import React, { useContext, useEffect, useState } from "react";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
import { useUpdateSession } from "../models/session";
import { SessionContext } from "./Session";

export default function VotesSummary({ users, showVotes }) {
    const [mean, setMean] = useState();
    const [median, setMedian] = useState();
    const { sessionId, ws } = useContext(SessionContext);
    const [updateSession, _resp] = useUpdateSession();

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

        // check if all users votes if yes show votes
        if (showVotes === true) return;

        const emptyVotes = users.filter((user) => {
            return user.votevalue === null;
        });

        if (emptyVotes.length === 0) {
            updateSession({
                sessionId,
                newParam: { showVotes: true },
            });
            ws.send(
                JSON.stringify({
                    sessionId,
                    type: "votingEnded",
                })
            );
        }
    }, [users]);

    function calculateMean(votesValues) {
        if (votesValues.length === 0 || votesValues.length === undefined)
            return undefined;
        // remove not numbers
        votesValues = removeNotNumbers(votesValues);
        const sum = votesValues.reduce((prevSum, i) => prevSum + i, 0);
        return roundToOne(sum / votesValues.length);
    }

    function calculateMedian(arr) {
        if (arr.length === 0 || arr.length === undefined) return undefined;
        if (arr.length == 0) {
            return;
        }
        // remove not numbers
        arr = removeNotNumbers(arr);
        arr.sort((a, b) => a - b); // 1.
        const midpoint = Math.floor(arr.length / 2); // 2.
        const median =
            arr.length % 2 === 1
                ? arr[midpoint] // 3.1. If odd length, just take midpoint
                : (arr[midpoint - 1] + arr[midpoint]) / 2; // 3.2. If even length, take median of midpoints
        return roundToOne(median);
    }

    function roundToOne(number) {
        return Math.round(number * 10) / 10;
    }

    function show({ value }) {
        return users.length === 0 || isNaN(value)
            ? ""
            : showVotes === true
            ? value
            : "?";
    }

    function removeNotNumbers(array) {
        const newArr = array
            .filter((item) => !isNaN(item) && item !== null && item !== false) // Remove non-numeric values
            .map((item) => Number(item)); // Convert remaining items to numbers
        return newArr;
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
