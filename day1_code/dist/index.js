import { WebSocketServer } from "ws";
//creating a new WS server
const wss = new WebSocketServer({ port: 3000 });
//evenet handler
wss.on("connection", function (socket) {
    console.log("Usser connected to server");
    setInterval(() => {
        socket.send("sol price: " + Math.random());
    }, 500);
});
//# sourceMappingURL=index.js.map