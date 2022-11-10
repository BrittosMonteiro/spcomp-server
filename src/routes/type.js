import express from "express";
const TypeRouter = express.Router();

import { getTypeList, postType } from "../controller/typeController.js";

TypeRouter.post("/", postType);

TypeRouter.get("/", getTypeList);

TypeRouter.put("/");

TypeRouter.delete("/");

export default TypeRouter;
