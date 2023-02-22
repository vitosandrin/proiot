import { Types } from "mongoose";

export interface IDevice {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  sensor: {
    sensorName: string;
    temperature: string;
    humidity: string;
  };
}
