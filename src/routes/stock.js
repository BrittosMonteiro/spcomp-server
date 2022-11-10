import express from "express";
import {
  deleteStockItem,
  getStockItemList,
  postStockItem,
  putStockItem,
} from "../controller/stockController.js";
const StockRouter = express.Router();

StockRouter.post("/", postStockItem);

StockRouter.get("/", getStockItemList);

StockRouter.put("/", putStockItem);

StockRouter.delete("/", deleteStockItem);

export default StockRouter;
