export interface ISocketData {
  name: string;
  description: string;
  temperature: string;
  humidity: string;
}

export interface ISocketProps {
  message: string;
  id: string;
  data: any;
}
