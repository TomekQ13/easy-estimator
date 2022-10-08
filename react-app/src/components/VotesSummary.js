import React, { useEffect, useState } from "react";

export default function VotesSummary({ votes }) {
    const [mean, setMean] = useState();

    useEffect(() => {
        const votesValues = [];
        votes.forEach((vote) => {
            votesValues.push(vote.votevalue);
        });
        const mean = calculateMean(votesValues);
        if (mean === undefined) return;
        setMean(mean);
    }, [votes]);

    function calculateMean(votesValues) {
        if (votesValues.length === 0 || votesValues.length === undefined)
            return undefined;
        const sum = votesValues.reduce((prevSum, i) => prevSum + i, 0);
        return sum / votesValues.length;
    }

    return (
        <div>
            <span>Mean {mean}</span>
        </div>
    );
}
