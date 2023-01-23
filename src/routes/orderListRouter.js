import express from "express";
import {
  createOrderListItem,
  deleteOrderListItem,
} from "../controller/orderListController.js";
const OrderListRouter = express.Router();

OrderListRouter.post("/", createOrderListItem);
OrderListRouter.get("/");
OrderListRouter.put("/");
OrderListRouter.delete("/", deleteOrderListItem);

export default OrderListRouter;
