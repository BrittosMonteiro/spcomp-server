import mongoose from "mongoose";

const purchaseItemSchema = new mongoose.Schema({
  idInquiryItem: { type: mongoose.Schema.Types.ObjectId, ref: "inquiry" },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  idCustomer: { type: mongoose.Schema.Types.ObjectId, ref: "customer" },
  idSupplier: { type: mongoose.Schema.Types.ObjectId, ref: "supplier" },
});

const PurchaseItemModel = mongoose.model("purchase", purchaseItemSchema);

export default PurchaseItemModel;
