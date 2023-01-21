import "dotenv/config";
import express from "express";
import cors from "cors";

import mongoose from "mongoose";
const CONNECT = process.env.MONGO_CONNECT;
const CONNECTDB = process.env.MONGO_DB;
const PORT = process.env.PORT || 5050;

import item from "./src/routes/itemRouter.js";
import InquiryItemRouter from "./src/routes/inquiryItemRouter.js";
import inquiryHistoryRouter from "./src/routes/inquiryHistoryRouter.js";
import InquiryListRouter from "./src/routes/inquiryListRouter.js";
import orderRouter from "./src/routes/orderRouter.js";
import StockRouter from "./src/routes/stock.js";
import BrandRouter from "./src/routes/brandRouter.js";
import TypeRouter from "./src/routes/typeRouter.js";
import EncapRouter from "./src/routes/encapRouter.js";
import UserRouter from "./src/routes/usersRouter.js";
import LoginRouter from "./src/routes/loginRouter.js";
import SupplierRoute from "./src/routes/supplierRouter.js";
import CustomerRoute from "./src/routes/customerRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/item", item);
app.use("/inquiryItem", InquiryItemRouter);
app.use("/inquiryHistory", inquiryHistoryRouter);
app.use("/inquiryList", InquiryListRouter);
app.use("/order", orderRouter);
app.use("/stock", StockRouter);
app.use("/brand", BrandRouter);
app.use("/type", TypeRouter);
app.use("/encap", EncapRouter);
app.use("/users", UserRouter);
app.use("/login", LoginRouter);
app.use("/supplier", SupplierRoute);
app.use("/customer", CustomerRoute);

try {
  mongoose.connect(`${CONNECT}/${CONNECTDB}`);
} catch (err) {
  console.log(err);
}

app.listen(PORT);
