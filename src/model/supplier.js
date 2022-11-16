import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: String,
  status: Boolean,
  observation: String,
});

const SupplierModel = mongoose.model("supplier", supplierSchema);

export default SupplierModel;
