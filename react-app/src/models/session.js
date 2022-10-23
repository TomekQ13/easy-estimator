import { useCallback, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export function useSession({ sessionId }) {
    const fetchWrapper = useFetch();
    const [sessionData, setSessionData] = useState({
        params: { showVotes: false },
    });

    const getSessionFunction = useCallback(
        ({ sessionId }) => {
            if (fetchWrapper !== undefined) {
                fetchWrapper({
                    url: `/session/${sessionId}`,
                    method: "GET",
                })
                    .then((response) => {
                        if (response.status === 404)
                            return console.error("Session does not exist");
                        return response.json();
                    })
                    .then((data) => {
                        console.log("Setting session data");
                        console.log(data);
                        setSessionData(data);
                    })
                    .catch((error) => {
                        console.error(
                            "There was an error while fetching session " + error
                        );
                    });
            }
        },
        [fetchWrapper]
    );

    useEffect(() => {
        console.log("Get session function called");
        if (sessionId === undefined || sessionId.trim() === "") return;
        getSessionFunction({ sessionId });
    }, [sessionId, getSessionFunction]);

    return [sessionData, setSessionData];
}

export function useCreateSession() {
    const fetchWrapper = useFetch();
    const [resp, setResp] = useState();

    function createSessionFunction({ sessionId, sessionPassword, params }) {
        return fetchWrapper({
            url: `/session/${sessionId}`,
            method: "POST",
            body: {
                hostId: "test",
                sessionPassword,
                params,
            },
        })
            .then((response) => {
                if (response.status === 201)
                    console.log("Session created successfully");
                if (response.status === 403 || response.status === 404)
                    return console.error(
                        "Received an error status from the server while creating session"
                    );
                setResp(response);
            })
            .catch((error) => {
                console.error(
                    "There was an error while creating a session " + error
                );
            });
    }

    return [createSessionFunction, resp];
}

export function useUpdateSession() {
    const fetchWrapper = useFetch();
    const [resp, setResp] = useState();

    async function updateSession({ sessionId, newParams }) {
        try {
            const response = await fetchWrapper({
                method: "PUT",
                url: `/session/${sessionId}`,
                body: {
                    params: newParams,
                },
            });
            setResp(response);
            if (response.status === 404)
                return console.error("Session to update not found");
            if (response.status === 201) {
                return console.log("Session data updated successfully");
            }
        } catch {
            console.error("There was an error while updating session data");
        }
    }

    return [updateSession, resp];
}
