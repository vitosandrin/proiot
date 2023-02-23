import { Server as HttpServer } from "http";
import { Socket, Server } from "socket.io";

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;

  constructor(server: HttpServer) {
    ServerSocket.instance = this;

    this.io = new Server(server, {
      pingInterval: 10000,
      pingTimeout: 5000,
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connect", this.connect);
  }

  connect = (socket: Socket) => {
    console.info("Connection received from " + socket.id);

    socket.on("joinRoom", (data) => {
      socket.join(data);
    });

    socket.on("sendMessage", (data) => {
      console.log(data, "from", socket.id);
      socket.to(data.room).emit("receiveMessage", data);
    });

    socket.on("sendAll", (data) => {
      console.log(data, "from", socket.id);
      socket.broadcast.emit("receiveAll", data);
    });

    socket.on("disconnect", () => {
      console.info("Disconnect received from: " + socket.id);
    });
  };

  sendMessage = (send: string, to: string, payload: Object) => {
    this.io.on("?", (socket) => {
      socket.on(send, () => {
        socket.broadcast.emit(to, payload);
      });
    });
  };
}
