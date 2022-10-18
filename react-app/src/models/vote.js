import { useCallback, useEffect, useState } from "react";
import { makeApiCallFunction } from "../apiAccess/makeCall";
import useFetch from "../hooks/useFetch";

export function useVotes({ sessionId }) {
    const fetchWrapper = useFetch();
    const [votes, setVotes] = useState([]);

    const getVotesFunction = useCallback(
        ({ sessionId }) => {
            if (fetchWrapper !== undefined)
                fetchWrapper({
                    url: `/vote/${sessionId}`,
                    method: "GET",
                })
                    .then((response) => {
                        if (response.status === 404) {
                            return [];
                        }

                        return response.json();
                    })
                    .then((data) => {
                        setVotes(data);
                    })
                    .catch((error) => {
                        console.error(
                            "There was an error while fetching votes " + error
                        );
                    });
        },
        [fetchWrapper]
    );

    useEffect(() => {
        getVotesFunction({ sessionId });
        console.log("Get votes function called");
    }, [sessionId, getVotesFunction]);

    return [votes, setVotes];
}

export function useMakeVote() {
    const fetchWrapper = useFetch();
    const [resp, setResp] = useState();

    async function vote({ sessionId, voteId, username, voteValue }) {
        const voteBody = {
            voteid: voteId,
            userid: username,
            votevalue: voteValue,
        };

        try {
            const response = await fetchWrapper({
                url: `/vote/${sessionId}`,
                method: "PUT",
                body: voteBody,
            });
            if (response.status === 201) console.log("Vote added successfully");
            setResp(response);
        } catch (error) {
            console.error("There was an error while adding a vote " + error);
        }
    }

    return [vote, resp];
}

export async function deleteVotes({
    sessionId,
    accessToken,
    refreshToken,
    setAccessTokenFunction,
}) {
    console.log("sessionId" + sessionId);
    await makeApiCallFunction({
        method: "DELETE",
        url: `/vote/all/${sessionId}`,
        accessToken,
        refreshToken,
        setAccessTokenFunction,
    })();
}
