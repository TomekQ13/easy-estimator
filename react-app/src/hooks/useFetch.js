import { useCallback, useContext } from "react";
import { authContext } from "../contexts/Auth";

export default function useFetch(authorization) {
    if (authorization === undefined) authorization = true;
    const { accessToken, refreshToken, setAccessToken } =
        useContext(authContext);

    const refreshAccessToken = useCallback(
        async ({ refreshToken, setAccessToken }) => {
            if (refreshToken === null || refreshToken === undefined)
                console.error("Missing refresh token");

            const tokenRefreshRequestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    refreshToken,
                }),
            };

            try {
                const resp = await fetch(
                    `${window._env_.API_URL}/user/token`,
                    tokenRefreshRequestOptions
                );
                const data = await resp.json();
                if (window._env_.DEBUG)
                    console.log(
                        "Setting new access token to " + data.accessToken
                    );
                setAccessToken(data.accessToken);
                return data;
            } catch (error) {
                console.error(
                    "There was an error while refreshing token " + error
                );
            }
        },
        [accessToken]
    );

    const fetchWrapper = useCallback(
        async ({ url, method, body, searchParams }) => {
            if (window._env_.DEBUG)
                console.log("Using fetch to " + url + " with method " + method);

            const requestOptions = {
                method: method,
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
            };

            if (authorization === true)
                requestOptions.headers[
                    "Authorization"
                ] = `Bearer ${accessToken}`;

            try {
                let requestUrl;
                if (searchParams === undefined)
                    requestUrl = `${window._env_.API_URL}${url}`;
                else
                    requestUrl =
                        `${window._env_.API_URL}${url}?` +
                        new URLSearchParams(searchParams);
                console.log(requestUrl);
                const response = await fetch(requestUrl, requestOptions);
                if (response.status === 403) {
                    if (window._env_.DEBUG)
                        console.log("Received 403. Refreshing accessToken");

                    refreshAccessToken({
                        refreshToken,
                        setAccessToken,
                    }).then((data) => {
                        requestOptions.headers[
                            "Authorization"
                        ] = `Bearer ${data.accessToken}`;
                        fetch(
                            `${window._env_.API_URL}${url}`,
                            requestOptions
                        ).then((response_1) => {
                            if (response_1.status === 403)
                                if (window._env_.DEBUG)
                                    console.error(
                                        "Received 403 for the second time."
                                    );
                        });
                    });
                }
                return response;
            } catch (error) {
                console.error(
                    "There was an error while fetching data " + error
                );
            }
        },
        [
            accessToken,
            refreshToken,
            setAccessToken,
            refreshAccessToken,
            authorization,
        ]
    );
    if (
        authorization === true &&
        (accessToken === undefined || refreshToken === undefined)
    )
        return undefined;

    return fetchWrapper;
}
