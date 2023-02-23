import { Server as HttpServer } from "http";
import { Socket, Server } from "socket.io";

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;
  public sendMessageWs: (send: string, to: string, payload: any) => void;

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
    this.sendMessageWs = () => {};
    this.io.on("connect", this.connect);
  }

  connect = (socket: Socket) => {
    console.info("Connection received from " + socket.id);

    this.sendMessageWs = (send: string, to: string, payload: any) => {
      socket.on(send, () => {
        socket.broadcast.emit(to, payload);
      });
    };

    socket.emit("test", "Hello from server");

    socket.on("joinRoom", (data) => {
      socket.join(data);
    });

    socket.on("sendMessage", (data) => {
      console.log(data, "from", socket.id);
      socket.to(data.room).emit("receiveMessage", data);
    });

    socket.on("sendDevice", (data) => {
      socket.broadcast.emit("receiveDevice", data);
    });

    socket.on("sendAll", (data) => {
      console.log(data, "from", socket.id);
      socket.broadcast.emit("receiveAll", data);
    });

    socket.on("disconnect", () => {
      console.info("Disconnect received from: " + socket.id);
    });
  };

  sendMessage = (message: string, payload: any) => {
    this.io.emit(message, payload);
  };

  test = () => {
    this.io.emit("message", "ok");
  };
}
