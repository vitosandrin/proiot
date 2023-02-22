import R from "ramda";
import objectid from "bson-objectid";

export const removeUndefined = (data: any) => {
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
