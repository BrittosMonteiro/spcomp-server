import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  idInquiryItem: { type: mongoose.Schema.Types.ObjectId, ref: "inquiry" },
  reason: { type: String, required: false },
});

const OrderItemModel = mongoose.model("order", orderItemSchema);

export default OrderItemModel;
