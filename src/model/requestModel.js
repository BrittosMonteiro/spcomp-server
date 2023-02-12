import mongoose from "mongoose";

const requestItemSchema = new mongoose.Schema({
  idInquiryItem: { type: mongoose.Schema.Types.ObjectId, ref: "inquiry" },
  reason: { type: String, required: false },
  isDeleted: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: Date.now() },
});

const RequestItemModel = mongoose.model("request", requestItemSchema);

export default RequestItemModel;
