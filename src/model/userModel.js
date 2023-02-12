import mongoose from "mongoose";

const userSchama = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: Boolean, required: true },
  isAdmin: { type: Boolean, required: true },
  role: { type: Number, required: true },
  isDeleted: { type: Boolean, required: true, default: false },
});

const UserModel = mongoose.model("user", userSchama);

export default UserModel;
