import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  status: Boolean,
  observation: String,
  role: Number,
  username: String,
});

const SupplierModel = mongoose.model("supplier", supplierSchema);

export default SupplierModel;
