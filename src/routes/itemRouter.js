import express from "express";
const ItemRouter = express.Router();

import {
  createItem,
  readItems,
  readSingleItem,
  updateItem,
  deleteItem,
} from "../controller/itemController.js";

ItemRouter.post("/", createItem);
ItemRouter.get("/", readItems);
ItemRouter.get("/single/:idItem", readSingleItem);
ItemRouter.put("/", updateItem);
ItemRouter.delete("/", deleteItem);

export default ItemRouter;
