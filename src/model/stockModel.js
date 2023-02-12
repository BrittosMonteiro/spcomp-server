import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  idInquiryItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "inquiry",
  },
  createdAt: { type: Date, required: true, default: Date.now() },
  isDeleted: { type: Boolean, required: true, default: false },
});

const StockModel = mongoose.model("stock", stockSchema);

export default StockModel;
