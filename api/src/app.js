const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const fs = require('fs');
const { getDataFile } = require('./actionsFile');

const port = 3001

app.use(cors())

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: 'POST'
    }
});

io.on('connection', (socket) => {
    console.log('a user connected id:', socket.id);
    const newSocket = fs.watch("valores.txt", (eventType, filename) => {
        if (eventType === 'change') {
            console.log(`File ${filename} has been changed`);
            const data = getDataFile('valores.txt')
            console.log(data)
            socket.emit('data', data);
        }
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
        newSocket.close();
    });

});

app.get('/', (req, res) => {
    res.send("Hello World");
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});