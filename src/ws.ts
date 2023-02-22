import { ISocketProps } from "./interfaces/socket";
import { io } from "./server";

export const connect = () => {
  io.on("connection", (socket) => {
    console.log("Connected", socket.id);
    return socket.id;
  });
};

export const disconnect = () => {
  io.on("disconnect", (socket) => {
    console.log("disconnected", socket.id);
    return socket.id;
  });
};

export const sendMessageSocket = async ({
  message,
  id,
  data,
}: ISocketProps) => {
  try {
    const socket = io.sockets.sockets.get(id);
    socket?.emit(message, data);
  } catch (err) {
    console.log(err);
  }
};
