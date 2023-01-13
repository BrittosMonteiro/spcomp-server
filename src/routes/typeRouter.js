import express from "express";
const TypeRouter = express.Router();

import {
  createType,
  readType,
  updateType,
  deleteType,
} from "../controller/typeController.js";
TypeRouter.post("/", createType);
TypeRouter.get("/", readType);
TypeRouter.put("/", updateType);
TypeRouter.delete("/", deleteType);

export default TypeRouter;
