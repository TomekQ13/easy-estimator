import { useCallback, useContext } from "react";
import config from "../config.json";
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
                    `${config.apiUrl}/user/token`,
                    tokenRefreshRequestOptions
                );
                const data = await resp.json();
                if (config.debug)
                    console.log(
                        "Setting new access token to " + data.accessToken
                    );
                setAccessToken(data.accessToken);
            } catch (error) {
                console.error(
                    "There was an error while refreshing token " + error
                );
            }
        },
        [accessToken]
    );

    const fetchWrapper = useCallback(
        async ({ url, method, body }) => {
            if (config.debug)
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
                const response = await fetch(
                    `${config.apiUrl}${url}`,
                    requestOptions
                );
                if (response.status === 403) {
                    if (config.debug)
                        console.log("Received 403. Refreshing accessToken");

                    refreshAccessToken({
                        refreshToken,
                        setAccessToken,
                    }).then(() => {
                        fetch(`${config.apiUrl}${url}`, requestOptions).then(
                            (response_1) => {
                                if (response_1.status === 403)
                                    if (config.debug)
                                        console.error(
                                            "Received 403 for the second time."
                                        );
                            }
                        );
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
