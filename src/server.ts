import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import express from "./config/express";
import setupSocket from "./config/socket";
dotenv.config();

const { APP_PORT, APP_HOST } = process.env;

const app = http.createServer(express);

const io = new Server(app);
setupSocket(io);

const server = app.listen(APP_PORT, (): void =>
  console.log(`Server Running at http://${APP_HOST}:${APP_PORT}`)
);

export default server;
