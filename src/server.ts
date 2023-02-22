import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import express from "./config/express";
import { ServerSocket } from "./ws";

dotenv.config();

const { APP_PORT, APP_HOST } = process.env;
const app = http.createServer(express);

new ServerSocket(app);

const server = app.listen(APP_PORT, (): void =>
  console.log(`Server Running at http://${APP_HOST}:${APP_PORT}`)
);

export { server };
