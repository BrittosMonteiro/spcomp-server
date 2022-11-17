import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  cnpj: String,
  contact: String,
  email: String,
  phone: String,
  status: Boolean,
  observation: String,
});

const CustomerModel = mongoose.model("customer", customerSchema);

export default CustomerModel;
