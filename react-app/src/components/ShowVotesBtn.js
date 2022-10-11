import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { updateSessionData } from "../models/session";
import { authContext } from "../contexts/Auth";
import { SessionContext } from "./Session";

export default function ShowVotesBtn({ websocket }) {
    const { sessionData, sessionId, setSessionData } =
        useContext(SessionContext);
    const { accessToken, refreshToken, setAccessToken } =
        useContext(authContext);

    async function handleClick() {
        try {
            websocket.send(
                JSON.stringify({
                    type: "showVotes",
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
            newSessionData.params.showVotes = true;
            setSessionData(newSessionData);
            updateSessionData({
                sessionId,
                newSessionData,
                accessToken,
                refreshToken,
                setAccessTokenFunction: setAccessToken,
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
