import {
  createUserCommnand,
  readUserCommand,
  upateUserCommand,
} from "../commands/userCommands.js";
import {
  created,
  errorNotFound,
  errorServiceUnavailable,
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
    .then((response) => {
      if (response) {
        const user = readUserCommand(response);
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
  const user = upateUserCommand(data);

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

export async function deleteUser(req, res) {
  const { idUser } = req.body;

  await UserModel.findByIdAndDelete(idUser)
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
