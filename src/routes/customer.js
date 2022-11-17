import express from "express";
import {
  createCustomer,
  getCustomerById,
  getCustomersList,
  removeCustomer,
  updateCustomer,
} from "../controller/customerController.js";
const CustomerRoute = express.Router();

CustomerRoute.post("/", createCustomer);
CustomerRoute.get("/", getCustomersList);
CustomerRoute.get("/id", getCustomerById);
CustomerRoute.put("/", updateCustomer);
CustomerRoute.delete("/", removeCustomer);

export default CustomerRoute;
