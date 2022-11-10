import express from "express";
const Router = express.Router();

import {
  addItemToPurchaseList,
  getPurchaseList,
  deleteItemFromPurchaseList,
} from "../controller/purchaseController.js";

Router.post("/", addItemToPurchaseList);

Router.get("/", getPurchaseList);

Router.delete("/", deleteItemFromPurchaseList);

export default Router;
