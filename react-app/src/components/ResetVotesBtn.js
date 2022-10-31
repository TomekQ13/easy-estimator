import React, { useContext } from "react";
import { useDeleteVotes } from "../models/vote";
import { authContext } from "../contexts/Auth";
import { SessionContext } from "./Session";
import Button from "react-bootstrap/Button";
import { useUpdateSession } from "../models/session";

export default function ResetVotesBtn({ setVotes, websocket, setMean }) {
    const [deleteVotes, _resp] = useDeleteVotes();
    const { sessionId, sessionData, setSessionData } =
        useContext(SessionContext);
    const [updateSession, __resp] = useUpdateSession();

    // this should be handled as just removing the votes components
    async function handleClick() {
        websocket.send(
            JSON.stringify({
                type: "resetVoting",
                sessionId,
            })
        );
        setVotes([]);
        setMean("");
        deleteVotes({
            sessionId: sessionData.sessionid,
        });

        const newSessionData = { ...sessionData };
        newSessionData.params.showVotes = false;
        setSessionData(newSessionData);
        updateSession({
            sessionId,
            newParams: newSessionData.params,
        });
    }

    return (
        <Button onClick={handleClick} variant="secondary">
            Reset voting
        </Button>
    );
}
