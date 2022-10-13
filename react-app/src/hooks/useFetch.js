import { useContext, useEffect, useState } from "react";
import config from "../config.json";
import { authContext } from "../contexts/Auth";

export default function useFetch({ url, method, body }) {
    const [resp, setResp] = useState();
    const { accessToken, refreshToken, setAccessToken } =
        useContext(authContext);

    useEffect(() => {
        if (config.debug)
            console.log("Using fetch to " + url + " with method " + method);

        if (url === undefined)
            return new Error("URL is required to make an API call");

        if (
            ["POST", "GET", "PUT", "DELETE"].includes(method.toUpperCase()) !==
            true
        ) {
            return new Error("Incorrect request method");
        }

        const requestOptions = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
        };

        fetch(`${config.apiUrl}${url}`, requestOptions)
            .then((resp) => {
                setResp(resp);
            })
            .catch((error) => {
                return new Error(
                    "There was an error while fetching data " + error
                );
            });
    }, [setResp, url, method, body, accessToken]);

    //         resp = await makeRequestWithAccessToken({ method, body });

    //         if (resp.status === 403) {
    //             console.log("Received status 403. Refreshing access token.");
    //             try {
    //                 await refreshAccessToken({
    //                     refreshToken,
    //                     setAccessToken,
    //                 });
    //             } catch (e) {
    //                 return console.log(
    //                     "There was an error while refreshing access token"
    //                 );
    //             }
    //             resp = await makeRequestWithAccessToken({ method, body });
    //         }

    //         if (resp.status === 403) {
    //             console.log("Received status code 403");
    //         }
    //         return resp;

    function refreshAccessToken({ refreshToken, setAccessToken }) {
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

        fetch(`${config.apiUrl}/user/token`, tokenRefreshRequestOptions)
            .then((resp) => {
                resp.json();
            })
            .then((data) => {
                if (config.debug === true)
                    console.log(
                        "Setting new access token to " + data.accessToken
                    );
                setAccessToken(data.accessToken);
            })
            .catch((error) => {
                throw new Error(
                    "There was an error while refreshing token " + error
                );
            });
    }

    return resp;
}
