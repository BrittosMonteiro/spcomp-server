import { loginCommand } from "../commands/loginCommands.js";
import {
  errorNotFound,
  errorServiceUnavailable,
  successData,
} from "../handlers/returns.js";
import UserModel from "../model/userModel.js";

export async function Login(req, res) {
  const { username, password } = req.body;

  await UserModel.findOne()
    .where("username")
    .equals(username)
    .then((response) => {
      if (response) {
        if (response.password === password) {
          const userLogin = loginCommand(response);
          return successData(res, userLogin);
        } else {
          return errorNotFound(res, "Username or password incorrect");
        }
      } else {
        return errorNotFound(res, "Username or password incorrect");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}
