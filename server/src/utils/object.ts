import R from "ramda";
import objectid from "bson-objectid";
import { Model } from "mongoose";
import { IDevice } from "../interfaces/device";

export const getRealPath = (document: Model<IDevice>, path: string) => {
  const parsePath = path.split(".");

  if (!document) return "";

  const { path: newPath } = parsePath.reduce(
    (acc: any, value: any) => {
      try {
        const [type, path] =
          value.indexOf(":") >= 0 ? value.split(":") : [, value];

        if (type) {
          const field = type === "id" ? "_id" : type;

          const newPath = acc.data.findIndex(
            (v: any) => v[field]?.toString() === path
          );

          if (newPath === -1) {
            return { data: acc.data, path: [...acc.path] };
          }

          return { data: acc.data[newPath], path: [...acc.path, newPath] };
        }

        return { data: acc.data[path], path: [...acc.path, path] };
      } catch (e) {
        console.log(e);
        throw `${path} inválido`;
      }
    },
    { path: [], data: document }
  );

  return newPath;
};

export const getItemFromPath = (document: Model<IDevice>, path: string) => {
  const newPath = getRealPath(document, path);

  if (newPath?.length !== path?.split(".")?.length) return [];

  if (newPath === "") {
    return document;
  }

  return R.path(newPath, document) || [];
};

export const updateItemFromPath = (
  document: Model<IDevice>,
  path: string,
  data: Object
) => {
  const newPath = getRealPath(document, path);

  if (newPath === "") {
    return document;
  }

  const currentData = R.path(newPath, document);

  const newData = { ...currentData!, ...data };

  return R.assocPath(newPath, newData, document);
};

export const removeUndefined = (data: unknown) => {
  const isUndefined = (value: any) =>
    R.type(value) === "Undefined" || value === "undefined";
  const notObjectId = (value: any) => !objectid.isValid(value);

  const removeFF: any = (value: any) => {
    if (R.type(value) === "Array") {
      const newValue = value.filter((item: any) => !isUndefined(item));
      return newValue.map(removeFF);
    }

    if (R.type(value) === "Object") {
      return Object.keys(value).reduce((acc, key) => {
        if (
          ["Object", "Array"].includes(R.type(value[key])) &&
          notObjectId(value[key])
        ) {
          return { ...acc, [key]: removeFF(value[key]) };
        }

        return isUndefined(value[key]) ? acc : { ...acc, [key]: value[key] };
      }, {});
    }

    return value;
  };

  const newData = removeFF(data);

  return newData;
};
