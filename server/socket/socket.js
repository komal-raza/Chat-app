const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});


const getReceiverSocketId = (receiverId) => userSocketMap[receiverId]
const userSocketMap = {};   //{userId :  socketId}  [key value pairs]


io.on("connection", (socket) => {
  // console.log(socket.id, "Connected user");

  const userId = socket.handshake.query.userId;

  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }

  // Sent an event to connected to all clients
  io.emit("GetOnlineUsers", Object.keys(userSocketMap));
  // Socket.io is used to listen to the events. Can be used both on client and server side.
  socket.on("disconnect", () => {
    // console.log("Disconnected user", socket.id);
    delete userSocketMap[userId];

    io.emit("GetOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { app, io, server,getReceiverSocketId };
