import React, { useContext } from "react";
import { useDeleteVotes } from "../models/vote";
import { SessionContext } from "./Session";
import Button from "react-bootstrap/Button";
import { useUpdateSession } from "../models/session";

export default function ResetVotesBtn({
    setVotes,
    websocket,
    setMean,
    setShowVotes,
}) {
    const [deleteVotes, _resp] = useDeleteVotes();
    const { sessionId } = useContext(SessionContext);
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
            sessionId,
        });

        setShowVotes(false);
        updateSession({
            sessionId,
            newParam: { showVotes: false },
        });
    }

    return (
        <Button onClick={handleClick} variant="secondary">
            Reset voting
        </Button>
    );
}
