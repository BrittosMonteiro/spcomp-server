import express from "express";
import { loginSupplier, loginUser } from "../controller/loginController.js";
const LoginRouter = express.Router();

LoginRouter.post("/loginUser", loginUser);
LoginRouter.post("/loginSupplier", loginSupplier);

export default LoginRouter;
