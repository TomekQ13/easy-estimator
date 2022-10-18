import { useCallback, useEffect, useState } from "react";
import { makeApiCallFunction } from "../apiAccess/makeCall";
import useFetch from "../hooks/useFetch";

export function useSession({ sessionId }) {
    const fetchWrapper = useFetch();
    const [sessionData, setSessionData] = useState({});

    const getSessionFunction = useCallback(
        ({ sessionId }) => {
            if (fetchWrapper !== undefined) {
                console.log("get session actually doinf something");
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
            } else {
                console.log("get session function doing nothing");
            }
        },
        [fetchWrapper]
    );

    useEffect(() => {
        console.log("Get session function called");
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

export async function updateSessionData({
    sessionId,
    newSessionData,
    accessToken,
    refreshToken,
    setAccessTokenFunction,
}) {
    const resp = await makeApiCallFunction({
        method: "PUT",
        url: `/session/${sessionId}`,
        body: {
            params: newSessionData,
        },
        accessToken,
        refreshToken,
        setAccessTokenFunction,
    })();
    return resp;
}
