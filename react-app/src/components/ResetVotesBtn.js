import React, { useContext } from "react";
import { useDeleteVotes } from "../models/vote";
import { SessionContext } from "./Session";
import Button from "react-bootstrap/Button";
import { useUpdateSession } from "../models/session";
import uuid from "react-uuid";

export default function ResetVotesBtn({ setShowVotes }) {
    const [deleteVotes, _resp] = useDeleteVotes();
    const { sessionId, users, setUsers, ws, addMessage } =
        useContext(SessionContext);
    const [updateSession, __resp] = useUpdateSession();

    // this should be handled as just removing the votes components
    async function handleClick() {
        try {
            ws.sendMessage({
                type: "resetVoting",
                sessionId,
            });
            const newUsers = [...users];
            newUsers.map((user) => {
                user.votevalue = null;
            });
            setUsers(newUsers);

            deleteVotes({
                sessionId,
            });

            setShowVotes(false);
            updateSession({
                sessionId,
                newParam: { showVotes: false },
            });
        } catch (e) {
            const newMessage = {
                text: `Connection lost. Please refresh the page.`,
                type: "error",
                id: uuid(),
            };
            addMessage({ newMessage });
        }
    }

    return (
        <Button onClick={handleClick} variant="danger" className="">
            Reset voting
        </Button>
    );
}
