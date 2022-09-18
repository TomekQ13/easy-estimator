const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 7000 })
const clients = new Map()

wss.on('connection', (ws) => {
    ws.on('message', (messageString) => {
        const message = JSON.parse(messageString)
        console.log(message)
        if (message.type === 'connect') {
            clients.set(ws, message.username)
            ws.send(JSON.stringify({
                type: 'usernames',
                usernames: getUsernames(clients)
            }))   
        } else {
            sendMessageToAllClients(clients, message)
        }
    })

    ping = setInterval(() => {
        [...clients.keys()].forEach((client) => {
            client.send(JSON.stringify({
                type: 'heartbeat'
            }))
            if (client.readyState !== 1) {
                client.close()
                const disconnectUsername = clients.get(client).username
                clients.delete(client)        
                sendMessageToAllClients(clients, {
                    type: 'disconnect',
                    username: disconnectUsername,
                    usernames: getUsernames(clients)
                })               
            }
        })
    }, 1000 * 5)

})

function getUsernames(clients) {
    if (clients === undefined) {
        return console.error('getUsernames needs a clients')
    }
    usernames = []
    for (const [_key, value] of clients) {
        usernames.push(value.username)
    }
    return usernames
}

function sendMessageToAllClients(clients, message) {
    if ((clients instanceof Map) === false) {
        return console.error('Incorrect clients value')
    }
    if (message === undefined) {
        return console.error('Message to send is missing')
    }
    if (message.type === undefined) {
        return console.error('Type of message is missing ')
    };

    [...clients.keys()].forEach((client) => {
        client.send(JSON.stringify(message))
    })
}

function createNewClient(username) {
    if (username === undefined) {
        return console.error('User must have a username')
    }
    const color = Math.floor(Math.random() * 360)
    const metadata = { 
        color,
        username
    }
    return metadata
}

function getUsernames(clients) {
    if (clients === undefined) {
        return console.error('getUsernames needs clients')
    }
    const usernames = []
    for (const [_key, value] of clients) {
        usernames.push(value.username)
    }
    return usernames
}