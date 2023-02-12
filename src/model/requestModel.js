import mongoose from "mongoose";

const requestItemSchema = new mongoose.Schema({
  idInquiryItem: { type: mongoose.Schema.Types.ObjectId, ref: "inquiry" },
  reason: { type: String, required: false },
  isDeleted: { type: Boolean, required: true, default: false },
});

const RequestItemModel = mongoose.model("request", requestItemSchema);

export default RequestItemModel;
