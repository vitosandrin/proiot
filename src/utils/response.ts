import { Response } from "express";

export const response = (
  res: Response,
  status?: number,
  message?: string,
  data?: any
) => {
  switch (status) {
    case 422:
      status = 422;
      break;
    case 401:
      status = 401;
      break;
    case 400:
      status = 400;
      break;
    case 404:
      status = 404;
      break;
    case 200:
      status = 200;
      break;
    case 201:
      status = 201;
      break;
    case 502:
      status = 502;
      break;
    default:
      status = 503;
      message = "Service unavaible!";
  }

  return res?.status(status).json({ message, data });
};
