import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  idBrand: { type: mongoose.Schema.Types.ObjectId, ref: "brand" },
  idType: { type: mongoose.Schema.Types.ObjectId, ref: "type" },
  idEncap: { type: mongoose.Schema.Types.ObjectId, ref: "encap" },
  ipi: { type: String, required: false },
  weight: { type: String, required: false },
  note: { type: String, required: false },
  createdAt: { type: Date, required: true, default: Date.now() },
  isDeleted: { type: Boolean, required: true, default: false },
});

const ItemModel = mongoose.model("item", itemSchema);

export default ItemModel;
