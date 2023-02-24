import { model, Schema, Types } from "mongoose";
import { IDevice } from "../interfaces/device";

const schema = new Schema<IDevice>(
  {
    name: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    sensor: {
      sensorName: { type: String, required: true },
      temperature: {
        type: String,
        required: true,
      },
      humidity: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: false,
  }
);

export const DeviceModel = model<IDevice>("devices", schema, "devices");
