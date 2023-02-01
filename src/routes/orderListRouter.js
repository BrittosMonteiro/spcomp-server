import express from "express";
import {
  createOrderListItem,
  readOrderList,
  readOrders,
  readOrderListBySupplier,
  readOrderListByUser,
  readOrderListByStock,
  updateOrderStatus,
  updateOrderAddItems,
  deleteOrderListItem,
} from "../controller/orderListController.js";
const OrderListRouter = express.Router();

OrderListRouter.post("/", createOrderListItem);
OrderListRouter.get("/order/:idOrder", readOrderList);
OrderListRouter.get("/orders", readOrders);
OrderListRouter.get("/bySupplier/:idSupplier", readOrderListBySupplier);
OrderListRouter.get("/byUser/:idUser", readOrderListByUser);
OrderListRouter.get("/stock", readOrderListByStock);
OrderListRouter.put("/");
OrderListRouter.put("/updateStatus", updateOrderStatus);
OrderListRouter.put("/updateOrderAddItems", updateOrderAddItems);
OrderListRouter.delete("/", deleteOrderListItem);

export default OrderListRouter;
