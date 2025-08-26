import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

console.log(`server is running at { ws://localhost:8080 } `);
interface User {
    socket: WebSocket;
    room: string;
}

let allSockets: User[] = [];

wss.on("connection", function (socket) {

    //handler that recive message
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message as unknown as string);
        if (parsedMessage.type === "join") {
            console.log("user joinded the: " + parsedMessage.payload.roomId);

            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId,
            })
        }

        if (parsedMessage.type === "chat") {
            console.log("user want to chat within: " + parsedMessage.payload.roomId);

            //checking the rooom for this currentUser
            let currentUserRoom = null;
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i]?.socket == socket) {
                    currentUserRoom = allSockets[i]?.room;
                }
            }

            //sending msg to user with sam rome
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i]?.room == currentUserRoom) {
                    allSockets[i]?.socket.send(parsedMessage.payload.message);
                }
            }
        }

    });

    socket.on("disconnect", () => {
        // allSockets = allSockets.filter(user => user != socket)
    })
})
