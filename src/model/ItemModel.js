import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  description: String,
  brand: String,
  type: String,
  encap: String,
  ipi: String,
  weight: String,
  note: String,
});

const ItemModel = mongoose.model("item", itemSchema);

export default ItemModel;
