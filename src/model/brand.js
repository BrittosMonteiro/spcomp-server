import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  description: String,
});

const BrandModel = mongoose.model("brand", brandSchema);

export default BrandModel;
