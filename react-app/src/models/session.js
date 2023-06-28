import { useCallback, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export function useSession({ sessionId, userId }) {
    const fetchWrapper = useFetch();
    const [showVotes, setShowVotes] = useState(false);
    const [resetVoting, setResetVoting] = useState(false);
    const [sessionName, setSessionName] = useState();
    const [users, setUsers] = useState([]);

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
                        if (response.status === 404)
                            return console.error("Session does not exist");
                        return response.json();
                    })
                    .then((data) => {
                        setShowVotes(data.showvotes);
                        setResetVoting(data.resetvoting);
                        setSessionName(data.sessionname);
                        setUsers(data.users);
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
        if (
            sessionId === undefined ||
            sessionId.trim() === "" ||
            userId === undefined
        )
            return;
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
        return fetchWrapper({
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
                return console.log("Session data updated successfully");
            }
        } catch {
            console.error("There was an error while updating session data");
        }
    }

    return [updateSession, resp];
}
