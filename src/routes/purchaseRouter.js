import express from "express";
const PurchaseRouter = express.Router();

import {
  createPurchaseItem,
  readPurchaseList,
  readPurchaseItem,
  updatePurchaseItem,
  deletePurchaseItem,
} from "../controller/purchaseController.js";

PurchaseRouter.post("/", createPurchaseItem);
PurchaseRouter.get("/", readPurchaseList);
PurchaseRouter.get("/single/:idPurchaseItem", readPurchaseItem);
PurchaseRouter.put("/", updatePurchaseItem);
PurchaseRouter.delete("/", deletePurchaseItem);

export default PurchaseRouter;
