import { Application, Request, Response } from "express";
import { log } from "../middlewares/log";
import { response } from "../utils/response";

import deviceRoutes from "./device";

export default (app: Application) => {
  app.all("/", log, (req: Request, res: Response) => response(res, 200, "SERVER OK"));

  app.use("/device", log, deviceRoutes);
};
