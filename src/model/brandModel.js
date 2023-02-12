import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  description: { type: String, required: true },
  isDeleted: { type: Boolean, required: true, default: false },
});

const BrandModel = mongoose.model("brand", brandSchema);

export default BrandModel;
