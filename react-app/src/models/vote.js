import { useState } from "react";
import useFetch from "../hooks/useFetch";

export function useMakeVote() {
    const fetchWrapper = useFetch();
    // const [resp, setResp] = useState();

    async function vote({ sessionId, userId, voteValue }) {
        if (fetchWrapper === undefined) return;

        fetchWrapper({
            url: `/vote/${sessionId}`,
            method: "PUT",
            body: {
                userid: userId,
                votevalue: voteValue,
            },
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
