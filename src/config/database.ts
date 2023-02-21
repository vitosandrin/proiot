import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
dotenv.config();

const { MONGO_HOST, MONGO_DATABASE, MONGO_PORT } = process.env;

const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("Mongo connected"))
  .catch(() => console.log("Error to connect Mongo"));

export default mongoose;
