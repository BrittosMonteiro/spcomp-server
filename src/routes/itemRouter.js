import express from "express";
const ItemRouter = express.Router();

import {
  createItem,
  readItems,
  updateItem,
  deleteItem,
} from "../controller/itemController.js";

ItemRouter.post("/", createItem);
ItemRouter.get("/", readItems);
ItemRouter.put("/", updateItem);
ItemRouter.delete("/", deleteItem);

export default ItemRouter;
