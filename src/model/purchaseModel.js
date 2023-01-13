import mongoose from "mongoose";

const purchaseItemSchema = new mongoose.Schema({
  idItemInuiry: String,
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
  nameUser: String,
  idCustomer: String,
  nameCustomer: String,
});

const PurchaseItemModel = mongoose.model("purchase", purchaseItemSchema);

export default PurchaseItemModel;
