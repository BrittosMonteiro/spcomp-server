import mongoose from "mongoose";

const inquiryListSchema = new mongoose.Schema({
  idInquiryHistory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "inquiryHistory",
  },
  idSupplier: { type: mongoose.Schema.Types.ObjectId, ref: "supplier" },
  idInquiryItem: { type: mongoose.Schema.Types.ObjectId, ref: "inquiry" },
  unitPurchasePriceInCents: { type: Number, required: false, default: 0 },
});

const InquiryListModel = mongoose.model("inquiryList", inquiryListSchema);

export default InquiryListModel;
