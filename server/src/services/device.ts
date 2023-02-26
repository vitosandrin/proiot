import { IDevice, IDeviceInfo } from "./../interfaces/device";
import { Request, Response } from "express";
import { serverSocket } from "../server";

import { DeviceModel } from "./../models/device";

import { response } from "../utils/response";
import Service from "./Service";
import { Types } from "mongoose";

class Devices {
  public device;
  constructor() {
    const device = Service(DeviceModel);
    this.device = device;
  }

  findOne = async (req: Request, res: Response) => {
    const { params } = req;

    if (!Types.ObjectId.isValid(params.id)) {
      response(res, 422, "Invalid id!");
      return;
    }

    try {
      const device = await this.device.findOne(req, { _id: params.id });
      if (!device) {
        response(res, 404, "Not Found!");
        return;
      }

      response(res, 200, "OK", device);
    } catch (error) {
      console.log(error);
      response(res, 502, "ERROR");
    }
  };

  new = async (req: Request, res: Response) => {
    const { body } = req;

    if (!body.name) {
      response(res, 422, "Inform the name of device");
      return;
    }

    let infoMapped: IDeviceInfo[] = [];
    for (let i = 0; i < body?.info?.length; i++) {
      const type = body.info[i].type;
      const unit = body.info[i].unit;
      const value = body.info[i].value;
      const obj = { type, value, unit };
      infoMapped.push(obj);
    }

    try {
      const data = {
        name: body.name,
        info: infoMapped,
      };

      const device = await this.device.create(req, data);
      serverSocket.sendMessageWs("receiveDevice", device);

      response(res, 201, `Created succesfully!`, device);
    } catch (error) {
      response(res, 502, "ERROR");
    }
  };

  findAll = async (req: Request, res: Response) => {
    try {
      const devices = await this.device.findAll(req);

      response(res, 200, "OK", devices);
    } catch (error) {
      response(res, 502, "ERROR");
    }
  };

  update = async (req: Request, res: Response) => {
    const { params, body } = req;

    if (!Types.ObjectId.isValid(params.id)) {
      response(res, 422, "Invalid id!");
      return;
    }

    const device = await this.device.findOne(req, { _id: params.id });

    if (!device) {
      response(res, 404, "Not Found!");
      return;
    }

    try {
      if (body.name) {
        await this.device.update(req, { _id: params.id }, { name: body.name });
      }

      if (body?.info?.length! > 0) {
        for (let i of body.info) {
          await this.device.updatePath(
            req,
            { _id: params.id },
            `info._id:${i._id}`,
            { type: i.type, unit: i.unit, value: i.value }
          );
        }
      }

      const device = await this.device.findOne(req, { _id: params.id });

      serverSocket.sendMessageWs("receiveDevice", device);

      response(res, 200, "Updated succesfully!", device);
    } catch (error) {
      console.log(error);
      response(res, 502, "ERROR");
    }
  };

  remove = async (req: Request, res: Response) => {
    const { params } = req;

    if (!Types.ObjectId.isValid(params.id)) {
      response(res, 422, "Invalid id!");
      return;
    }

    const device = await this.device.findOne(req, { _id: params.id });

    if (!device) {
      response(res, 404, "Not found!");
      return;
    }

    try {
      await this.device.remove(req, { _id: params.id });

      response(res, 200, "Removed succesfully");
    } catch (error) {
      response(res, 502, "ERROR");
    }
  };
}
export default Devices;
