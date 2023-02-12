import mongoose from "mongoose";

const inquiryHistorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: Date.now() },
  suppliersList: [{ type: mongoose.Schema.Types.ObjectId, ref: "supplier" }],
  hasArrived: { type: Boolean, required: true, default: false },
  isDeleted: { type: Boolean, required: true, default: false },
});

const InquiryHistoryModel = mongoose.model(
  "inquiryHistory",
  inquiryHistorySchema
);

export default InquiryHistoryModel;
