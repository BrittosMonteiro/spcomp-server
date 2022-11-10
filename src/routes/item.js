import express from "express";
const Router = express.Router();

import {
  createItem,
  deleteItem,
  getAllItems,
  updateItem,
} from "../controller/itemController.js";

Router.post("/", createItem);

Router.get("/", getAllItems);

Router.put("/", updateItem);

Router.delete("/", deleteItem);

export default Router;
