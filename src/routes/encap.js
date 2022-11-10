import express from "express";
const EncapRouter = express.Router();

import { getEncapList, postEncap } from "../controller/encapController.js";

EncapRouter.post("/", postEncap);

EncapRouter.get("/", getEncapList);

EncapRouter.put("/");

EncapRouter.delete("/");

export default EncapRouter;
