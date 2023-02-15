import express from "express";
const RequestRouter = express.Router();

import {
  createRequest,
  readRequest,
  readRequestBySupplier,
  readRequestByUser,
  readSingleRequest,
  updateRequest,
  deleteRequest,
} from "../controller/requestController.js";

RequestRouter.post("/", createRequest);
RequestRouter.get("/", readRequest);
RequestRouter.get("/bySupplier/:idSupplier", readRequestBySupplier);
RequestRouter.get("/readByUser/:idUser", readRequestByUser);
RequestRouter.get("/single/:idRequestItem", readSingleRequest);
RequestRouter.put("/", updateRequest);
RequestRouter.delete("/", deleteRequest);

export default RequestRouter;
