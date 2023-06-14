import { useCallback, useEffect, useState } from "react";
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
    }, [sessionId, getVotesFunction]);

    return [votes, setVotes];
}

export function useMakeVote() {
    const fetchWrapper = useFetch();
    // const [resp, setResp] = useState();

    async function vote({ sessionId, voteId, username, voteValue }) {
        if (fetchWrapper === undefined) return;
        const voteBody = {
            voteid: voteId,
            userid: username,
            votevalue: voteValue,
        };

        fetchWrapper({
            url: `/vote/${sessionId}`,
            method: "PUT",
            body: voteBody,
        })
            .then((response) => {
                if (response.status === 201)
                    console.log("Vote added successfully");
            })
            .catch((error) => {
                console.error(
                    "There was an error while adding a vote " + error
                );
            });
    }

    // return [vote, resp];
    return [vote];
}

export function useDeleteVotes() {
    const fetchWrapper = useFetch();
    const [resp, setResp] = useState();

    async function deleteVotes({ sessionId }) {
        try {
            const response = await fetchWrapper({
                url: `/vote/all/${sessionId}`,
                method: "DELETE",
            });
            if (window._env_.DEBUG) {
                if (response.status === 200)
                    console.log(
                        "Votes deleted successfully for sessionId " + sessionId
                    );
            }
            setResp(response);
        } catch {
            console.error("There was an error while deleting votes");
        }
    }

    return [deleteVotes, resp];
}
