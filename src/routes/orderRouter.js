import express from "express";
const OrderRouter = express.Router();

import {
  createOrder,
  readOrder,
  readOrderByUser,
  readSingleOrder,
  updateOrder,
  deleteOrder,
} from "../controller/orderController.js";

OrderRouter.post("/", createOrder);
OrderRouter.get("/", readOrder);
OrderRouter.get("/readByUser/:idUser", readOrderByUser);
OrderRouter.get("/single/:idPurchaseItem", readSingleOrder);
OrderRouter.put("/", updateOrder);
OrderRouter.delete("/", deleteOrder);

export default OrderRouter;
