import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  quantity: { type: Number, required: true, default: 0 },
  unitPurchasePriceInCents: { type: Number, required: true, default: 0 },
  unitSalePriceInCents: { type: Number, required: true, default: 0 },
  idItem: { type: mongoose.Schema.Types.ObjectId, ref: "item", required: true },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  idCustomer: { type: mongoose.Schema.Types.ObjectId, ref: "customer" },
  idSupplier: { type: mongoose.Schema.Types.ObjectId, ref: "supplier" },
  createdAt: { type: Date, required: true, default: Date.now() },
  step: { type: Number, required: true, default: 0 },
  leadtime: { type: String },
  datacode: { type: String },
  condition: { type: String },
  isDeleted: { type: Boolean, required: true, default: false },
});

const InquiryModel = mongoose.model("inquiry", inquirySchema);

export default InquiryModel;
