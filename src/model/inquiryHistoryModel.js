import mongoose from "mongoose";

const inquiryHistorySchema = new mongoose.Schema({
  title: { type: String, required: true },
});

const InquiryHistoryModel = mongoose.model(
  "inquiryHistory",
  inquiryHistorySchema
);

export default InquiryHistoryModel;
