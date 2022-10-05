import { makeApiCallFunction } from "../apiAccess/makeCall";

export async function getSession({
    sessionId,
    accessToken,
    refreshToken,
    setAccessTokenFunction,
}) {
    const resp = await makeApiCallFunction({
        method: "GET",
        url: `/session/${sessionId}`,
        accessToken,
        refreshToken,
        setAccessTokenFunction,
    })();
    if (resp === undefined) return undefined;
    if (resp.status === 401 || resp.status === 403) return undefined;
    if (resp.status === 404) return null;
    const data = await resp.json();
    return data;
}

export async function createSession({
    sessionId,
    sessionPassword,
    params,
    accessToken,
    refreshToken,
    setAccessTokenFunction,
}) {
    const resp = makeApiCallFunction({
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

export async function resetVotes({}) {}
