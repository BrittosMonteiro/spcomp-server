import jwt from "jsonwebtoken";
import { accessDenied } from "../handlers/returns";

export default function auth(req, res, next) {
  const token = req.header("authorization-token");
  if (!token) return accessDenied(res, "Acesso negado!");

  try {
    jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (err) {
    return accessDenied(res, "Acesso negado!");
  }
}
