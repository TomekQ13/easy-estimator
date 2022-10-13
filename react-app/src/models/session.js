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

export async function createSession({
    sessionId,
    sessionPassword,
    params,
    accessToken,
    refreshToken,
    setAccessTokenFunction,
}) {
    const resp = await makeApiCallFunction({
        method: "POST",
        url: `/session/${sessionId}`,
        body: {
            hostId: "test",
            sessionPassword: sessionPassword,
            params: params,
        },
        accessToken,
        refreshToken,
        setAccessTokenFunction,
    })();
    if (resp === undefined) return;
    return resp;
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
