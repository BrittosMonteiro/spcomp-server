import UserModel from "../model/user.js";

export async function Login(req, res) {
  const data = req.body;

  const getUserLogin = await UserModel.findOne()
    .where("username")
    .equals(data.username);

  if (getUserLogin && getUserLogin.password === data.password) {
    const data = {
      username: getUserLogin.username,
      isAdmin: getUserLogin.isAdmin,
      token: getUserLogin._id,
    };
    return res.json({ data, status: 200 });
  }

  return res.json({ status: 404 });
}
