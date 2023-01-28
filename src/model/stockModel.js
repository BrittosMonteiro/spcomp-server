import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  idInquiryItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "inquiry",
  },
  createdAt: { type: Date, required: true, default: Date.now() },
});

const StockModel = mongoose.model("stock", stockSchema);

export default StockModel;
