import express from "express";
const SupplierRoute = express.Router();
import {
  createSupplier,
  readSuppliers,
  readSupplierById,
  deleteSupplier,
  updateSupplier,
} from "../controller/supplierController.js";

SupplierRoute.post("/", createSupplier);
SupplierRoute.get("/", readSuppliers);
SupplierRoute.get("/single/:idSupplier", readSupplierById);
SupplierRoute.put("/", updateSupplier);
SupplierRoute.delete("/", deleteSupplier);

export default SupplierRoute;
