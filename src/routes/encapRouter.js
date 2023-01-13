import express from "express";
const EncapRouter = express.Router();

import {
  createEncap,
  readEncap,
  updateEncap,
  deleteEncap,
} from "../controller/encapController.js";

EncapRouter.post("/", createEncap);
EncapRouter.get("/", readEncap);
EncapRouter.put("/", updateEncap);
EncapRouter.delete("/", deleteEncap);

export default EncapRouter;
