import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

console.log(`server is running at { ws://localhost:8080 } `);

let userCount = 0;
let allSockets: WebSocket[] = []

wss.on("connection", function (socket) {
    userCount = userCount + 1;
    allSockets.push(socket);
    console.log("User connect: " + userCount);


    //handler that recive MSG
    socket.on("message", (msg) => {
        for (let i = 0; i < allSockets.length; i++) {
            const s = allSockets[i];
            s?.send(msg.toString());
        }
    })
})
