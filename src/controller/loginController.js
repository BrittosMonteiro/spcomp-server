import { loginCommand } from "../commands/loginCommands.js";
import {
  errorNotFound,
  errorServiceUnavailable,
  successData,
} from "../handlers/returns.js";
import UserModel from "../model/userModel.js";
import SupplierModel from "../model/supplierModel.js";
import bcrypt from "bcryptjs";

export async function loginUser(req, res) {
  const { username, password } = req.body;

  await UserModel.findOne()
    .where("username")
    .equals(username.toLowerCase())
    .then((response) => {
      if (response) {
        const comparePass = bcrypt.compareSync(password, response.password);
        if (comparePass) {
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

export async function loginSupplier(req, res) {
  const { username, password } = req.body;

  await SupplierModel.findOne()
    .where("username")
    .equals(username)
    .then((response) => {
      if (response) {
        const comparePass = bcrypt.compareSync(password, response.password);
        if (comparePass) {
          const supplier = loginCommand(response);
          return successData(res, supplier);
        } else {
          return errorNotFound(res, "Username or password incorrect");
        }
      } else {
        return errorNotFound(res, "Username or password incorrect");
      }
    })
    .catch((err) => {
      return errorCouldNotLoad(res, err.message);
    });
}
