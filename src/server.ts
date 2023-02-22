import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import express from "./config/express";
dotenv.config();

const { APP_PORT, APP_HOST } = process.env;
const app = http.createServer(express);
const io = new Server(app, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("sendDevice", (msg) => {
    console.log("message: ", msg);
    io.emit("sendDevice", msg);
  });
});

const server = app.listen(APP_PORT, (): void =>
  console.log(`Server Running at http://${APP_HOST}:${APP_PORT}`)
);

export { server, io };
