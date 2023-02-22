import { Server } from "socket.io";
import { ISocketData } from "../interfaces/socket";

export default function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("update", (data: ISocketData) => {
      console.log("Received update:", data);

      io.emit("update", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
  return io;
}
