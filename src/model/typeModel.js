import mongoose from "mongoose";

const typeSchema = new mongoose.Schema({
  description: String,
});

const TypeModel = mongoose.model("type", typeSchema);

export default TypeModel;
