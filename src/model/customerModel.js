import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cnpj: { type: String, required: true, unique: true },
  contact: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  status: { type: Boolean, required: true },
  observation: { type: String, required: false },
  isDeleted: { type: Boolean, required: true, default: false },
});

const CustomerModel = mongoose.model("customer", customerSchema);

export default CustomerModel;
