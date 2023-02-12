import mongoose from "mongoose";

const inquiryListSchema = new mongoose.Schema({
  idInquiryHistory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "inquiryHistory",
  },
  idInquiryItem: { type: mongoose.Schema.Types.ObjectId, ref: "inquiry" },
  prices: [],
  isDeleted: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: Date.now() },
});

const InquiryListModel = mongoose.model("inquiryList", inquiryListSchema);

export default InquiryListModel;
