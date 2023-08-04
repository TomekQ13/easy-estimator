import React from "react";

export const websocketContext = React.createContext();

export default function Websocket({ children }) {
    function makeWebsocket() {
        const ws = new WebSocket(window._env_.WS_URL);
        ws.heartbeat = heartbeat;
        ws.sendMessage = sendMessage;
        return ws;
    }

    function heartbeat() {
        clearTimeout(this.pingTimeout);
        this.pingTimeout = setTimeout(() => {
            console.error("You have been disconnected");
        }, 1000 * 10 + 2000);
    }

    function sendMessage(body) {
        if (this.readyState !== 1) {
            throw new Error(
                "Connection to websocket lost. Displaying error notification."
            );
        }

        this.send(JSON.stringify(body));
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
