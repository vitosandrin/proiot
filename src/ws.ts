import { Server as HttpServer } from "http";
import { Socket, Server } from "socket.io";

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;

  constructor(server: HttpServer) {
    ServerSocket.instance = this;

    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin: "*",
      },
    });

    this.io.on("connect", this.startListeners);
  }

  startListeners = (socket: Socket) => {
    console.info("Connection received from " + socket.id);

    socket.on("message", (data, payload) => {
      console.log(data, "from", socket.id);
      socket.emit(payload);
    });
    socket.on("disconnect", () => {
      console.info("Disconnect received from: " + socket.id);
    });
  };

  sendMessage = (name: string, socketId: string, payload?: Object) => {
    console.info("Emitting event: " + name);
    this.io.to(socketId).emit(name, payload);
  };
}
