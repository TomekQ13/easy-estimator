const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 7000 });
const sessions = {};
const connectedClients = new Set();

wss.on("connection", (ws) => {
    connectedClients.add(ws);

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
            const disconnectUser = connectedClients.get(ws);
            connectedClients.delete(ws);
            sendMessageToAllClients(connectedClients, {
                type: "disconnect",
                username: disconnectUser.username,
                userId: disconnectUser.userId,
            });
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
        // remove disconnected clients
        if (connectedClients.has(client) === false) {
            sessions[message.sessionId].delete(client);
            return;
        }
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
