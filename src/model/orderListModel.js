import mongoose from "mongoose";

const orderListSchema = new mongoose.Schema({
  idInquiryItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "inquiry",
  },
  createdAt: { type: Date, required: true, default: Date.now() },
});

const OrderListModel = mongoose.model("orderList", orderListSchema);

export default OrderListModel;
