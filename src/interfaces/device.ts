import { Types } from "mongoose";

export interface IDevice {
  _id?: Types.ObjectId;
  description: string;
  name: string;
  sensors: {
    temperature: {
      unit: string;
    };
    humidity: {
      unit: string;
    };
  };
}
