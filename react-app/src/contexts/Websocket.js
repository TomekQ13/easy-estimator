import React from "react";
import uuid from "react-uuid";
import { useMakeVote } from "../models/vote";

export const websocketContext = React.createContext();

export default function Websocket({ children }) {
    const [vote] = useMakeVote();

    async function makeWebsocket({ sessionId, username }) {
        const ws = await connectToWebsocket();
        ws.heartbeat = heartbeat;
        ws.send(
            JSON.stringify({
                type: "connect",
                sessionId,
                username,
            })
        );
        vote({
            sessionId: sessionId,
            voteId: uuid(),
            username,
            voteValue: null,
        });
        return ws;
    }

    async function connectToWebsocket() {
        const ws = new WebSocket("ws://localhost:7000/ws");
        return new Promise((resolve) => {
            const timer = setInterval(() => {
                if (ws.readyState === 1) {
                    clearInterval(timer);
                    resolve(ws);
                }
            }, 10);
        });
    }

    function heartbeat() {
        clearTimeout(this.pingTimeout);
        this.pingTimeout = setTimeout(() => {
            console.error("You have been disconnected");
        }, 1000 * 10 + 2000);
    }

    const websocketContextValue = {
        makeWebsocket,
    };

    return (
        <websocketContext.Provider value={websocketContextValue}>
            {children}
        </websocketContext.Provider>
    );
}
