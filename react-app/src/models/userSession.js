import { useState } from "react";
import useFetch from "../hooks/useFetch";

export function useJoinUserSession() {
    const fetchWrapper = useFetch();
    const [response, setResponse] = useState([]);

    function joinUserSessionFunction({ sessionId, userId }) {
        return fetchWrapper({
            url: `/usersession/${sessionId}`,
            method: "POST",
            body: {
                userid: userId,
            },
        })
            .then((resp) => {
                if (resp.status === 201) {
                    console.log("User session added successfully");
                    setResponse(resp);
                }
            })
            .catch((error) => {
                console.error(
                    "There was an error while fetching session " + error
                );
            });
    }

    return [joinUserSessionFunction, response];
}
