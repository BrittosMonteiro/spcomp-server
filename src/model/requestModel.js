import mongoose from "mongoose";

const requestItemSchema = new mongoose.Schema({
  idInquiryItem: { type: mongoose.Schema.Types.ObjectId, ref: "inquiry" },
  reason: { type: String, required: false },
});

const RequestItemModel = mongoose.model("request", requestItemSchema);

export default RequestItemModel;
