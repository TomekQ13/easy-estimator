import { useCallback, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export function useSession({ sessionId, userId }) {
    const fetchWrapper = useFetch();
    const [showVotes, setShowVotes] = useState(false);
    const [resetVoting, setResetVoting] = useState(false);
    const [sessionName, setSessionName] = useState();
    const [users, setUsers] = useState([]);
    const [sessionExists, setSessionExists] = useState({ state: undefined });

    const getSessionFunction = useCallback(
        ({ sessionId, userId }) => {
            if (fetchWrapper !== undefined) {
                fetchWrapper({
                    url: `/session/${sessionId}`,
                    method: "GET",
                    searchParams: {
                        userId,
                    },
                })
                    .then((response) => {
                        if (response.status === 404) {
                            setSessionExists({ state: false });
                            return console.error("Session does not exist");
                        }
                        return response.json(); //this pases the data to the next then
                    })
                    .then((data) => {
                        if (data === undefined) return;
                        setShowVotes(data.showvotes);
                        setResetVoting(data.resetvoting);
                        setSessionName(data.sessionname);
                        setUsers(data.users);
                        setSessionExists({ state: true });
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
        if (sessionId === undefined || userId === undefined) return;
        getSessionFunction({ sessionId, userId });
    }, [sessionId, getSessionFunction, userId]);

    return {
        showVotes,
        setShowVotes,
        resetVoting,
        setResetVoting,
        sessionName,
        setSessionName,
        users,
        setUsers,
        sessionExists,
    };
}

export function useCreateSession() {
    const fetchWrapper = useFetch();
    const [resp, setResp] = useState();

    function createSessionFunction({
        sessionId,
        sessionPassword,
        hostId,
        params,
    }) {
        fetchWrapper({
            url: `/session/${sessionId}`,
            method: "POST",
            body: {
                hostId,
                sessionPassword,
                params,
            },
        })
            .then((response) => {
                if (response.status === 201)
                    console.log("Session created successfully");
                if (response.status === 403 || response.status === 404)
                    console.error(
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

    async function updateSession({ sessionId, newParam }) {
        try {
            const response = await fetchWrapper({
                method: "PUT",
                url: `/session/${sessionId}`,
                body: {
                    params: newParam,
                },
            });
            setResp(response);
            if (response.status === 404)
                return console.error("Session to update not found");
            if (response.status === 201) {
                if (window._env_.DEBUG === "true")
                    return console.log("Session data updated successfully");
            }
        } catch {
            console.error("There was an error while updating session data");
        }
    }

    return [updateSession, resp];
}
