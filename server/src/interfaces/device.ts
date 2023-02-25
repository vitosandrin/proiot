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
// export interface IDevice {
//   _id?: Types.ObjectId;
//   name: string;
//   description: string;
//   sensor: {
//     sensorName: string;
//     temperature: string;
//     humidity: string;
//   };
// }
