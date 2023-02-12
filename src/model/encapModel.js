import mongoose from "mongoose";

const encapSchema = new mongoose.Schema({
  description: { type: String, required: true, unique: true },
  isDeleted: { type: Boolean, required: true, default: false },
});

const EncapModel = mongoose.model("encap", encapSchema);

export default EncapModel;
