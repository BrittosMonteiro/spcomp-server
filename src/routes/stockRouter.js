import express from "express";
import {
  createStockItem,
  readStockList,
  updateStockItem,
  deleteStockItem,
  deleteImportStockItem,
} from "../controller/stockController.js";
const StockRouter = express.Router();

StockRouter.post("/", createStockItem);
StockRouter.get("/", readStockList);
StockRouter.put("/", updateStockItem);
StockRouter.delete("/", deleteStockItem);
StockRouter.delete("/deleteImportStockItem", deleteImportStockItem);

export default StockRouter;
