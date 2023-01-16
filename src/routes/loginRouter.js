import express from "express";
import { Login } from "../controller/loginController.js";
const LoginRouter = express.Router();

LoginRouter.post("/", Login);

export default LoginRouter;
