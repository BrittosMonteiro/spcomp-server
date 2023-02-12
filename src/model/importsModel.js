import mongoose from "mongoose";

const importsHistorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: new Date().toISOString().split("T")[0],
  },
  createdAt: { type: Date, required: true, default: Date.now() },
  status: { type: Boolean, required: true, default: false },
  idOrder: [{ type: mongoose.Schema.Types.ObjectId, ref: "orderList" }],
  isDeleted: { type: Boolean, required: true, default: false },
});

const ImportsHistoryModel = mongoose.model(
  "importsHistory",
  importsHistorySchema
);

export default ImportsHistoryModel;
