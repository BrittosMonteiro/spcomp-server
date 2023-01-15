import mongoose from "mongoose";

const typeSchema = new mongoose.Schema({
  description: { type: String, unique: true, required: true },
});

const TypeModel = mongoose.model("type", typeSchema);

export default TypeModel;
