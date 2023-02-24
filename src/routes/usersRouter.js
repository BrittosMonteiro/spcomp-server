import express from "express";
import {
  createUser,
  readUsers,
  readUserById,
  updateUser,
  updatePassword,
  deleteUser,
} from "../controller/userController.js";
const UserRouter = express.Router();

UserRouter.post("/", createUser);
UserRouter.get("/", readUsers);
UserRouter.get("/single/:idUser", readUserById);
UserRouter.put("/", updateUser);
UserRouter.put("/updatePassword", updatePassword);
UserRouter.delete("/", deleteUser);

export default UserRouter;
