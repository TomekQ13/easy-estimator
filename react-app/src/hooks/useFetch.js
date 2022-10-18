import { useCallback, useContext } from "react";
import config from "../config.json";
import { authContext } from "../contexts/Auth";

export default function useFetch() {
    const { accessToken, refreshToken, setAccessToken } =
        useContext(authContext);

    if (config.debug) console.log("Use fetch rendered");
    const refreshAccessToken = useCallback(
        async ({ refreshToken, setAccessToken }) => {
            if (refreshToken === null || refreshToken === undefined)
                throw new Error("Missing refresh token");

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
                throw new Error(
                    "There was an error while refreshing token " + error
                );
            }
        },
        [accessToken]
    );

    const fetchWrapper = useCallback(
        ({ url, method, body }) => {
            if (url === undefined)
                throw new Error("URL is required to make an API call");

            if (
                ["POST", "GET", "PUT", "DELETE"].includes(
                    method.toUpperCase()
                ) !== true
            ) {
                throw new Error("Incorrect request method");
            }
            if (config.debug)
                console.log("Using fetch to " + url + " with method " + method);

            const requestOptions = {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(body),
            };

            return fetch(`${config.apiUrl}${url}`, requestOptions)
                .then((response) => {
                    if (response.status === 403) {
                        if (config.debug)
                            console.log("Received 403. Refreshing accessToken");

                        refreshAccessToken({
                            refreshToken,
                            setAccessToken,
                        }).then(() => {
                            fetch(
                                `${config.apiUrl}${url}`,
                                requestOptions
                            ).then((response) => {
                                if (response.status === 403)
                                    if (config.debug)
                                        console.error(
                                            "Received 403 for the second time."
                                        );
                            });
                        });
                    }
                    return response;
                })
                .catch((error) => {
                    console.error(
                        "There was an error while fetching data " + error
                    );
                });
        },
        [accessToken, refreshToken, setAccessToken, refreshAccessToken]
    );
    if (accessToken === undefined || refreshToken === undefined)
        return undefined;
    return fetchWrapper;
}
