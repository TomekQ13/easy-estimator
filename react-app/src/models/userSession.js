import { useCallback, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export function useJoinUserSession({ sessionId, userId }) {
    const fetchWrapper = useFetch();

    const [response, setResponse] = useState([]);

    const joinUserSessionFunction = useCallback(
        ({ sessionId, userId }) => {
            if (fetchWrapper !== undefined) {
                fetchWrapper({
                    url: `/usersession/${sessionId}`,
                    method: "POST",
                    body: {
                        userid: userId,
                    },
                })
                    .then((resp) => {
                        if (resp.status === 201) setResponse(resp);
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
            userId === undefined ||
            sessionId.trim() === ""
        )
            return;
        joinUserSessionFunction({ sessionId, userId });
    }, [sessionId, userId, joinUserSessionFunction]);

    return {
        response,
    };
}
