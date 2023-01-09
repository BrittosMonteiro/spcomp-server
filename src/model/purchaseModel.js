import mongoose from "mongoose";

const purchaseItemSchema = new mongoose.Schema({
  idInquiry: String,
  idItem: String,
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

const PurchaseItemModel = mongoose.model("purchase", purchaseItemSchema);

export default PurchaseItemModel;
