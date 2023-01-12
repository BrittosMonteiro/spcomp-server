import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  idItem: String,
  idUser: String,
  description: String,
  brand: String,
  type: String,
  encap: String,
  ipi: Number,
  weight: Number,
  note: String,
  step: Number,
  status: String,
  quantity: Number,
  unitPurchasePriceInCents: Number,
  unitSalePriceInCents: Number,
  idSupplier: String,
  nameSupplier: String,
});

const InquiryModel = mongoose.model("inquiry", inquirySchema);

export default InquiryModel;
