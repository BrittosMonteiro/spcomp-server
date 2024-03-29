import bcrypt from "bcryptjs";

import {
  createUserCommnand,
  readUserByIdCommand,
  readUserCommand,
  updateUserCommand,
} from "../commands/userCommands.js";
import {
  created,
  errorNotFound,
  errorServiceUnavailable,
  noContent,
  successData,
  successMessage,
} from "../handlers/returns.js";
import UserModel from "../model/userModel.js";

export async function createUser(req, res) {
  const data = req.body;
  const user = createUserCommnand(data);

  await new UserModel(user)
    .save()
    .then((response) => {
      if (response) {
        return created(res, "User created");
      } else {
        return errorServiceUnavailable(res, "User could not be created");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function readUsers(req, res) {
  let usersList = [];

  await UserModel.find()
    .where("isDeleted")
    .equals(false)
    .sort({ name: "asc" })
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const user = readUserCommand(doc);
          usersList.push(user);
        }
        return successData(res, usersList);
      } else {
        return errorServiceUnavailable(res, "User could not be loaded");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function readUserById(req, res) {
  const { idUser } = req.params;

  await UserModel.findById(idUser)
    .where("isDeleted")
    .equals(false)
    .then((response) => {
      if (response) {
        const user = readUserByIdCommand(response);
        return successData(res, user);
      } else {
        return errorServiceUnavailable(res, "User could not be loaded");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function updateUser(req, res) {
  const { idUser, data } = req.body;
  const user = updateUserCommand(data);

  await UserModel.findByIdAndUpdate(idUser, user)
    .then((response) => {
      if (response) {
        return successMessage(res, "User updated");
      } else {
        return errorServiceUnavailable(res, "User could not be updated");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function updatePassword(req, res) {
  const { idUser, newPassword, confirmNewPassword } = req.body;

  if (newPassword === confirmNewPassword) {
    await UserModel.findByIdAndUpdate(idUser, {
      password: bcrypt.hashSync(newPassword, 14),
    })
      .then((responseUpdate) => {
        if (responseUpdate) {
          return successMessage(res, "Password updated");
        } else {
          return noContent(res, "Password could not be updated");
        }
      })
      .catch((err) => {
        return errorServiceUnavailable(res, err.message);
      });
  } else {
    return noContent(res, "Passwords do not match");
  }
}

export async function setUserLastTimeOnline(idUser) {
  await UserModel.findByIdAndUpdate(idUser, { lastTimeOnline: Date.now() });
}

export async function deleteUser(req, res) {
  const { idUser } = req.body;

  await UserModel.findByIdAndUpdate(idUser, { isDeleted: true })
    .then((response) => {
      if (response) {
        return successMessage(res, "User deleted");
      } else {
        return errorServiceUnavailable(res, "User could not be deleted");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}
