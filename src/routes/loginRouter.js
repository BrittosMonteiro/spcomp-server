import express from "express";
import { loginSupplier, loginUser } from "../controller/loginController.js";
const LoginRouter = express.Router();

LoginRouter.post("/", loginUser);
LoginRouter.post("/", loginSupplier);

export default LoginRouter;
