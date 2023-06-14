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
    const { sessionId, users, setUsers } = useContext(SessionContext);
    const [updateSession, __resp] = useUpdateSession();

    // this should be handled as just removing the votes components
    async function handleClick() {
        websocket.send(
            JSON.stringify({
                type: "resetVoting",
                sessionId,
            })
        );
        const newUsers = [...users];
        newUsers.map((user) => {
            user.votevalue = null;
        });
        setUsers(newUsers);

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
