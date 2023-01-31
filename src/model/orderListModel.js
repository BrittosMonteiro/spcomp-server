import mongoose from "mongoose";

const orderListSchema = new mongoose.Schema({
  idSupplier: { type: mongoose.Schema.Types.ObjectId, ref: "supplier" },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "inquiry",
      required: false,
    },
  ],
  createdAt: { type: Date, required: true, default: Date.now() },
  status: { type: Boolean, required: true, default: false },
});

const OrderListModel = mongoose.model("orderList", orderListSchema);

export default OrderListModel;
