import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { useUpdateSession } from "../models/session";
import { SessionContext } from "./Session";
import uuid from "react-uuid";

export default function ShowVotesBtn() {
    const { sessionId, setShowVotes, ws, addMessage } =
        useContext(SessionContext);
    const [updateSession, _resp] = useUpdateSession();

    async function handleClick() {
        try {
            ws.sendMessage({
                type: "showVotes",
                sessionId,
            });
            setShowVotes(true);
            updateSession({
                sessionId,
                newParam: { showVotes: true },
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
        <Button variant="primary" className="" onClick={handleClick}>
            Show votes
        </Button>
    );
}
