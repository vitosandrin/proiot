import { Server as HttpServer } from "http";
import { Socket, Server } from "socket.io";
import { DeviceModel } from "./models/device";

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
    console.info("Connection received from ", socket.id);

    socket.on("sendDevice", async (data) => {
      console.log(data, "from", socket.id);
      const device = await DeviceModel.findOne({ _id: data._id });
      socket.broadcast.emit("receiveDevice", device);
    });

    socket.on("sendDevices", async (data) => {
      console.log(data, "from", socket.id);
      const devices = await DeviceModel.find();
      socket.broadcast.emit("receiveDevices", devices);

    })
    socket.on("disconnect", () => {
      console.info("Disconnect received from: ", socket.id);
    });
  };
}
