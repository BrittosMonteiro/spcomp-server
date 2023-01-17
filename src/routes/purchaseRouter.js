import express from "express";
const PurchaseRouter = express.Router();

import {
  createPurchase,
  readPurchase,
  readSinglePurchase,
  updatePurchase,
  deletePurchase,
} from "../controller/purchaseController.js";

PurchaseRouter.post("/", createPurchase);
PurchaseRouter.get("/", readPurchase);
PurchaseRouter.get("/single/:idPurchaseItem", readSinglePurchase);
PurchaseRouter.put("/", updatePurchase);
PurchaseRouter.delete("/", deletePurchase);

export default PurchaseRouter;
