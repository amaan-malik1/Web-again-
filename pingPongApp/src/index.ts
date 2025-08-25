import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

console.log("WebSocket server is listening on ws://localhost:8080");

wss.on("connection", (socket) => {
    console.log("User connected");

    socket.on("message", (e) => {
        const msg = e.toString().trim();
        console.log("Received:", msg);

        if (msg === "ping") {
            socket.send("pong");
            console.log(" Sent: pong");
        }
    });
});
