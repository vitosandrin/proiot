import { Types } from "mongoose";
export interface IDeviceInfo {
  _id?: string;
  type: string;
  value: number;
  unit: string;
}

export interface IDevice extends Document {
  _id?: string;
  name: string;
  info: IDeviceInfo[];
}
