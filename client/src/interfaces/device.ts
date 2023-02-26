export interface IDeviceInfo {
  _id?: string;
  type: string;
  value: number;
  unit: string;
}

export interface IDevice {
  _id?: string;
  name: string;
  info: IDeviceInfo[];
}

