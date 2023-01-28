import express from "express";
import {
  createStockItem,
  readStockList,
  updateStockItem,
  deleteStockItem,
} from "../controller/stockController.js";
const StockRouter = express.Router();

StockRouter.post("/", createStockItem);
StockRouter.get("/", readStockList);
StockRouter.put("/", updateStockItem);
StockRouter.delete("/", deleteStockItem);

export default StockRouter;
