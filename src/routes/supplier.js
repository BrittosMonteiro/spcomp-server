import express from "express";
const SupplierRoute = express.Router();
import {
  createSupplier,
  getSupplierById,
  getSuppliersList,
  removeSupplier,
  updateSupplier,
  loginSupplier,
} from "../controller/supplierController.js";

SupplierRoute.post("/", createSupplier);
SupplierRoute.get("/", getSuppliersList);
SupplierRoute.get("/id", getSupplierById);
SupplierRoute.put("/", updateSupplier);
SupplierRoute.delete("/", removeSupplier);
SupplierRoute.post("/login", loginSupplier);

export default SupplierRoute;
