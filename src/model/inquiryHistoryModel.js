import mongoose from "mongoose";

const inquiryHistorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: Boolean, required: true },
  createdAt: { type: Date, required: true, default: Date.now() },
});

const InquiryHistoryModel = mongoose.model(
  "inquiryHistory",
  inquiryHistorySchema
);

export default InquiryHistoryModel;
