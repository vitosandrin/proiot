import { Model } from "mongoose";
import {
  getItemFromPath,
  removeUndefined,
  updateItemFromPath,
} from "../utils/object";
import {
  IFindAllOptions,
  IFindAllResponse,
  IRequest,
} from "../interfaces/service";
import { IDevice } from "../interfaces/device";

export default (model: Model<IDevice>) => {
  const toObject = (data: any) => JSON.parse(JSON.stringify(data));

  const create = (req = {}, data = {}) => {
    return model.create(removeUndefined(data));
  };

  const findAll = async (
    req: IRequest = {},
    query: any = {},
    options: IFindAllOptions | any = {}
  ): Promise<IFindAllResponse> => {
    const limit = parseInt(req?.query?.limit || "10", 10);
    const page = parseInt(req?.query?.page || "1", 10);

    const sort = options.sort || { _id: 1 };
    const project = options.project || "-nenhum";

    const result = await model
      .aggregate([
        {
          $facet: {
            data: [
              {
                $match: query,
              },
              {
                $skip: (page - 1) * limit,
              },
              {
                $limit: limit,
              },
              {
                $sort: sort,
              },
            ],
            total: [
              {
                $match: query,
              },
              { $count: "total" },
            ],
          },
        },
      ])
      .project(project);

    return {
      result: result?.[0]?.data || [],
      total: result?.[0]?.total[0]?.total || 0,
      page,
      totalPages: Math.ceil(result?.[0]?.total[0]?.total / limit) || 0,
      limit,
    };
  };

  const findOne = async (req = {}, query = {}, ...props: any) => {
    return model.findOne(query, ...props).then(async (data: any) => {
      return data ? data.toObject() : data;
    });
  };

  const remove = (req = {}, query = {}) => {
    return model.deleteOne(query);
  };

  const update = (req = {}, query = {}, data = {}) => {
    return model.updateOne(query, removeUndefined(data));
  };

  const findOnePath = async (req = {}, query = {}, path = "") => {
    const document = await findOne(req, query);
    return getItemFromPath(document, path);
  };

  const updatePath = async (req = {}, query = {}, path = "", data = {}) => {
    const document = await findOne(req, query);

    const updatedDocument = updateItemFromPath(
      toObject(document),
      path,
      removeUndefined(data)
    );

    await update(req, query, updatedDocument);

    return findOnePath(req, query, path);
  };

  return {
    create,
    findOne,
    findAll,
    remove,
    update,

    updatePath
  };
};
