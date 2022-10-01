import React, { useEffect, useState } from "react";

export default function VotesSummary({ votes }) {
    const [mean, setMean] = useState();

    useEffect(() => {
        const votesValues = [];
        votes.forEach((vote) => {
            votesValues.push(vote.votevalue);
        });
        const mean = calculateMean(votesValues);
        setMean(mean);
    }, [votes]);

    function calculateMean(votesValues) {
        if (votesValues.length === 0) return undefined;
        let sum = 0;
        votes.forEach((vote) => {
            sum = sum + vote.value;
        });
        console.log(sum / votesValues.length);
        return sum / votesValues.length;
    }

    return (
        <div>
            <span>Mean {mean}</span>
        </div>
    );
}
