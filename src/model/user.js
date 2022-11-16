import mongoose from "mongoose";

const userSchama = new mongoose.Schema({
  name: String,
  surname: String,
  username: String,
  email: String,
  password: String,
  status: Boolean,
});

const UserModel = mongoose.model("user", userSchama);

export default UserModel;
