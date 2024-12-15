import { useCallback, useEffect, useState } from "react";
import useFetch from "./useFetch";

export function useCreateUser() {
    const fetchWrapper = useFetch(false);

    function registerUser({ username, sessionId }) {
        return fetchWrapper({
            url: "/user/register",
            method: "POST",
            body: {
                username,
                sessionId,
            },
        })
            .then((response) => {
                if (response.status === 201) {
                    if (window._env_.DEBUG === "true")
                        console.log("User registered successfully");
                    return response.json();
                }

                if (
                    response.status === 403 ||
                    response.status === 404 ||
                    response.status === 400
                )
                    return console.error(
                        "Received an error while registering a user"
                    );
            })
            .catch((_error) => {
                console.error("There was an error while registering a user ");
                return undefined;
            });
    }

    return registerUser;
}

export function useUser({ userId }) {
    const fetchWrapper = useFetch(false);
    const [username, setUsername] = useState();

    const getUserFunction = useCallback(
        ({ userId }) => {
            if (fetchWrapper !== undefined) {
                fetchWrapper({
                    url: `/user/${userId}`,
                    method: "GET",
                })
                    .then(async (response) => {
                        if (response.status === 404) {
                            setUsername(null);
                            console.log("User does not exist");
                            return;
                        }
                        const data = await response.json();
                        setUsername(data.username);
                    })
                    .catch((_error) => {
                        console.error(
                            "There was an error while fetching user " + _error
                        );
                    });
            }
        },
        [fetchWrapper]
    );

    useEffect(() => {
        if (userId === undefined) return;
        getUserFunction({ userId });
    }, [userId]);

    return { username, setUsername };
}
