import { model, Schema, Types } from "mongoose";
import { IDevice } from "../interfaces/device";

const schema = new Schema<IDevice>(
  {
    name: {
      type: String,
      required: true,
    },
    info: [
      {
        type: {
          type: String,
          required: true,
        },
        value: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: false,
  }
);

export const DeviceModel = model<IDevice>("devices", schema, "devices");
