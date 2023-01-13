import express from "express";
import {
  createCustomer,
  readCustomers,
  readCustomerById,
  readCustomerToItem,
  updateCustomer,
  deleteCustomer,
} from "../controller/customerController.js";
const CustomerRoute = express.Router();

CustomerRoute.post("/", createCustomer);
CustomerRoute.get("/", readCustomers);
CustomerRoute.get("/single/:idCustomer", readCustomerById);
CustomerRoute.get("/readCustomerToItem", readCustomerToItem);
CustomerRoute.put("/", updateCustomer);
CustomerRoute.delete("/", deleteCustomer);

export default CustomerRoute;
