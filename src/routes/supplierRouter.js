import express from "express";
const SupplierRoute = express.Router();
import {
  createSupplier,
  readSuppliers,
  readSupplierById,
  removeSupplier,
  updateSupplier,
  loginSupplier,
} from "../controller/supplierController.js";

SupplierRoute.post("/", createSupplier);
SupplierRoute.get("/", readSuppliers);
SupplierRoute.get("/single/:idSupplier", readSupplierById);
SupplierRoute.put("/", updateSupplier);
SupplierRoute.delete("/", removeSupplier);
SupplierRoute.post("/login", loginSupplier);

export default SupplierRoute;
