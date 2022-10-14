import { useEffect, useState } from "react";
import { makeApiCallFunction } from "../apiAccess/makeCall";
import useFetch from "../hooks/useFetch";

export function useSession(sessionId) {
    const [session, setSession] = useState({});
    const resp = useFetch({
        url: `/session/${sessionId}`,
        method: "GET",
    });

    if (resp === undefined) return [session, setSession];
    // if (resp.status === 401 || resp.status === 403) return undefined;
    // if (resp.status === 404) return null;

    resp.json()
        .then((data) => {
            setSession(data);
        })
        .catch((error) => {
            throw new Error(
                "There has been an error while transforming session data to JSON " +
                    error
            );
        });

    return [session, setSession];
}

export function useCreateSession() {
    const [fetchFunction, resp] = useFetch();

    useEffect(() => {
        if (resp === undefined) return;
        if (resp.status === 201) console.log("Session created successfully");
        if (resp.status === 403 || resp.status === 404)
            throw new Error("There has been an error while creating a session");
    });

    function createSessionFunction({ sessionId, sessionPassword, params }) {
        fetchFunction({
            url: `/session/${sessionId}`,
            method: "POST",
            body: {
                hostId: "test",
                sessionPassword,
                params,
            },
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
