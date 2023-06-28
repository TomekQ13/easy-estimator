import React from "react";

export const websocketContext = React.createContext();

export default function Websocket({ children }) {
    function makeWebsocket() {
        const ws = new WebSocket(window._env_.WS_URL);
        ws.heartbeat = heartbeat;
        return ws;
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
