import mongoose from "mongoose";

const encapSchema = new mongoose.Schema({
  description: String,
});

const EncapModel = mongoose.model("encap", encapSchema);

export default EncapModel;
