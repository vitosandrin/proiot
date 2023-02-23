import { IDevice } from "./device";

export interface IFindAllOptions {
  sort?: {
    [id: string]: number;
  };
  project?: string;
}

export interface IFindAllResponse {
  result?: IDevice[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IRequest {
  query?: {
    limit?: string;
    page?: string;
  };
}
