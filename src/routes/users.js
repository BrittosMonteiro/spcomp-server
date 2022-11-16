import express from "express";
import {
  createUser,
  getUserById,
  getUsersList,
  removeUser,
  updateUser,
} from "../controller/userController.js";
const UserRouter = express.Router();

UserRouter.post("/", createUser);
UserRouter.get("/", getUsersList);
UserRouter.get("/id", getUserById);
UserRouter.put("/", updateUser);
UserRouter.delete("/", removeUser);

export default UserRouter;
