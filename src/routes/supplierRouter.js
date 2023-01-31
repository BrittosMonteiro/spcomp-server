import express from "express";
const SupplierRoute = express.Router();
import {
  createSupplier,
  readSuppliers,
  readSupplierById,
  readSupplierSimple,
  updateSupplier,
  deleteSupplier,
} from "../controller/supplierController.js";

SupplierRoute.post("/", createSupplier);
SupplierRoute.get("/", readSuppliers);
SupplierRoute.get("/simple", readSupplierSimple);
SupplierRoute.get("/single/:idSupplier", readSupplierById);
SupplierRoute.put("/", updateSupplier);
SupplierRoute.delete("/", deleteSupplier);

export default SupplierRoute;
