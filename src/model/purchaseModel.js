import mongoose from "mongoose";

const purchaseItemSchema = new mongoose.Schema({
  idInquiryItem: { type: mongoose.Schema.Types.ObjectId, ref: "inquiry" },
});

const PurchaseItemModel = mongoose.model("purchase", purchaseItemSchema);

export default PurchaseItemModel;
