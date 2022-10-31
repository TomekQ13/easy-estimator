import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { useUpdateSession } from "../models/session";
import { SessionContext } from "./Session";

export default function ShowVotesBtn({ websocket }) {
    const { sessionData, sessionId, setSessionData } =
        useContext(SessionContext);
    const [updateSession, _resp] = useUpdateSession();

    async function handleClick() {
        try {
            websocket.send(
                JSON.stringify({
                    type: "showVotes",
                    sessionId,
                })
            );
        } catch (e) {
            console.error(e);
            console.error(
                "There has been an error when sending websocket message to show votes"
            );
        }
        try {
            const newSessionData = { ...sessionData };
            setSessionData(newSessionData);
            const newParams = newSessionData.params;
            newParams.showVotes = true;
            updateSession({
                sessionId,
                newParams,
            });
        } catch (e) {
            console.error(e);
            console.error("There has been an error when updating session data");
        }
    }

    return (
        <Button variant="primary" className="me-2 mb-1" onClick={handleClick}>
            Show votes
        </Button>
    );
}
