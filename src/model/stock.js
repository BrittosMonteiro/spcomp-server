import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  idItem: String,
  idInquiry: String,
  idPurchase: String,
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
});

const StockModel = mongoose.model("stock", stockSchema);

export default StockModel;
