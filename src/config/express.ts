import express from "express";
import cors from "cors";
import routes from "../routes";

import "../config/database";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

export default app;
