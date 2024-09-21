const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 7000 });
const sessions = {};
const wsSession = new Map();

wss.on("connection", (ws) => {
    ws.on("message", (messageString) => {
        const message = JSON.parse(messageString);
        if (process.env.NODE_ENV !== "production") console.log(message);
        if (message.sessionId === undefined)
            return console.error("Missing sessionId on a message");

        if (message.type === "connect") {
            if (!(message.sessionId in sessions))
                sessions[message.sessionId] = new Map();

            sessions[message.sessionId].set(ws, {
                username: message.username,
                userId: message.userId,
            });

            wsSession.set(ws, message.sessionId);
        }
        sendMessageToAllClients(sessions[message.sessionId], message);
    });

    ping = setInterval(() => {
        ws.send(
            JSON.stringify({
                type: "heartbeat",
            })
        );
        if (ws.readyState !== 1) {
            ws.close();
            const disconnectedSession = wsSession.get(ws);
            if (disconnectedSession !== undefined) {
                const disconnectUser = sessions[disconnectedSession].get(ws);
                if (process.env.NODE_ENV !== "production")
                    console.log(
                        `Client ${disconnectUser.username}, ${disconnectUser.userId} has disconnected`
                    );
                sessions[disconnectedSession].delete(ws);
                wsSession.delete(ws);
                // sendMessageToAllClients(sessions[disconnectedSession], {
                //     type: "disconnect",
                //     username: disconnectUser.username,
                //     userId: disconnectUser.userId,
                // });
            }
            clearInterval(ping);
        }
    }, 1000 * 5);
});

function sendMessageToAllClients(clients, message) {
    if (clients instanceof Map === false) {
        return console.error("Incorrect clients value");
    }
    if (message === undefined) {
        return console.error("Message to send is missing");
    }
    if (message.type === undefined) {
        return console.error("Type of message is missing ");
    }

    [...clients.keys()].forEach((client) => {
        client.send(JSON.stringify(message));
    });
}

// function createNewClient(username) {
//     if (username === undefined) {
//         return console.error("User must have a username");
//     }
//     const color = Math.floor(Math.random() * 360);
//     const metadata = {
//         color,
//         username,
//     };
//     return metadata;
// }

// function getUsernames(clients) {
//     if (clients === undefined) {
//         return console.error("getUsernames needs clients");
//     }
//     const usernames = [];
//     for (const [_key, value] of clients) {
//         usernames.push(value);
//     }
//     return usernames;
// }
