import UserModel from "../model/user.js";

export async function Login(req, res) {
  const data = req.body;

  const getUserLogin = await UserModel.findOne()
    .where("username")
    .equals(data.username)
    .where("password")
    .equals(data.password);

  return res.json(getUserLogin);
}
