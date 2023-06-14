import { useCallback, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export function useJoinUserSession() {
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

    return [joinUserSessionFunction, response];
}
