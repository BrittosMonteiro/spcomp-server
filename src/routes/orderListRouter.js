import express from "express";
import {
  createOrderListItem,
  readOrderList,
  readOrderListByCompany,
  readOrderListByUser,
  deleteOrderListItem,
  readOrderListByStock,
} from "../controller/orderListController.js";
const OrderListRouter = express.Router();

OrderListRouter.post("/", createOrderListItem);
OrderListRouter.get("/all", readOrderList);
OrderListRouter.get("/byCompany/:idCompany", readOrderListByCompany);
OrderListRouter.get("/byUser/:idUser", readOrderListByUser);
OrderListRouter.get("/stock", readOrderListByStock);
OrderListRouter.put("/");
OrderListRouter.delete("/", deleteOrderListItem);

export default OrderListRouter;
