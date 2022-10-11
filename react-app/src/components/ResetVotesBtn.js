import React, { useContext } from "react";
import { deleteVotes } from "../models/vote";
import { authContext } from "../contexts/Auth";
import { SessionContext } from "./Session";
import Button from "react-bootstrap/Button";
import { updateSessionData } from "../models/session";

export default function ResetVotesBtn({ setVotes, websocket, setMean }) {
    const { accessToken, refreshToken, setAccessToken } =
        useContext(authContext);
    const { sessionId, sessionData, setSessionData } =
        useContext(SessionContext);

    // this should be handled as just removing the votes components
    async function handleClick() {
        try {
            websocket.send(
                JSON.stringify({
                    type: "resetVoting",
                })
            );
            setVotes([]);
            setMean("");
            deleteVotes({
                sessionId: sessionData.sessionid,
                accessToken,
                refreshToken,
                setAccessTokenFunction: setAccessToken,
            });
        } catch (e) {
            console.error(e);
            console.error("There has been an error while deleting votes");
        }

        try {
            const newSessionData = { ...sessionData };
            newSessionData.params.showVotes = false;
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
        <Button onClick={handleClick} variant="secondary">
            Reset voting
        </Button>
    );
}
