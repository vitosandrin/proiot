import { Application, Request, Response } from "express";
import { log } from "../middlewares/log";
import { response } from "../utils/response";

export default (app: Application) => {
  app.all("/", log, (req: Request, res: Response) => response(res, 200, "OK"));
};
