import React from "react";

export const websocketContext = React.createContext();

export default function Websocket({ children }) {
    async function makeWebsocket({ sessionId, username, userId }) {
        const ws = await connectToWebsocket();
        ws.heartbeat = heartbeat;
        ws.send(
            JSON.stringify({
                type: "connect",
                sessionId,
                username,
                userId,
            })
        );
        return ws;
    }

    async function connectToWebsocket() {
        const ws = new WebSocket(window._env_.WS_URL);
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
