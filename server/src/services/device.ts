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

      serverSocket.sendMessageWs("receiveDevice", device);

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
    if (!body.description) {
      response(res, 422, "Inform a short description of device");
      return;
    }
    if (!body.sensorName) {
      response(res, 422, "Inform the sensor name of device");
      return;
    }
    if (!body.temperature) {
      response(res, 422, "Inform the temperature of sensor");
      return;
    }
    if (!body.humidity) {
      response(res, 422, "Inform the humidity of sensor");
      return;
    }

    const data = {
      name: body.name,
      description: body.description,
      sensor: {
        sensorName: body.sensorName,
        temperature: `${body.temperature}ºC`,
        humidity: `${body.humidity}%`,
      },
    };

    try {
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

    const data = {
      name: body.name ? body.name : device.name,
      description: body.description ? body.description : device.description,
      sensor: {
        sensorName: body.sensorName
          ? body.sensorName
          : device.sensor.sensorName,
        temperature: body.temperature
          ? `${body.temperature}ºC`
          : device.sensor.temperature,
        humidity: body.humidity ? `${body.humidity}%` : device.sensor.humidity,
      },
    };

    try {
      await this.device.update(req, { _id: params.id }, data);

      const device = await this.device.findOne(req, { _id: params.id });

      serverSocket.sendMessageWs("receiveDevice", device);

      response(res, 200, "Updated succesfully!");
    } catch (error) {
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
