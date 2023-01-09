import mongoose from "mongoose";

const userSchama = new mongoose.Schema({
  name: String,
  surname: String,
  username: String,
  email: String,
  password: String,
  status: Boolean,
  isAdmin: Boolean,
  role: Number,
});

const UserModel = mongoose.model("user", userSchama);

export default UserModel;
