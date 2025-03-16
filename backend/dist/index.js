"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let usercount = 0;
let allsockets = [];
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        var _a;
        const parsemessage = JSON.parse(message);
        if (parsemessage.type == "join") {
            allsockets.push({ socket, room: parsemessage.payload.roomId });
        }
        if (parsemessage.type == "chat") {
            const currentUserRoom = (_a = allsockets.find(x => x.socket == socket)) === null || _a === void 0 ? void 0 : _a.room;
            for (let i = 0; i < allsockets.length; i++) {
                if (allsockets[i].room == currentUserRoom) {
                    allsockets[i].socket.send(parsemessage.payload.message);
                }
            }
        }
    });
});
