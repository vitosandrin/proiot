export interface IDevice {
  _id?: string;
  name?: string;
  description?: string;
  sensor?: {
    sensorName?: string;
    temperature?: string;
    humidity?: string;
  };
}

export const initialStateDevice = {
  _id: "",
  name: "",
  description: "",
  sensorName: "",
  temperature: 0,
  humidity: 0,
};
