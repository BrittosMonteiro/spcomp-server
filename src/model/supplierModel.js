import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: Boolean, required: true },
  isAdmin: { type: Boolean, required: true },
  role: { type: Number, required: true },
  contact: { type: String },
  observation: { type: String },
  isDeleted: { type: Boolean, required: true, default: false },
});

const SupplierModel = mongoose.model("supplier", supplierSchema);

export default SupplierModel;
