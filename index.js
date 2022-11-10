import "dotenv/config";
import express from "express";
import cors from "cors";

import mongoose from "mongoose";
const CONNECT = process.env.MONGO_CONNECT;
const CONNECTDB = process.env.MONGO_DB;

import item from "./src/routes/item.js";
import inquiry from "./src/routes/inquiry.js";
import purchase from "./src/routes/purchase.js";
import StockRouter from "./src/routes/stock.js";
import BrandRouter from "./src/routes/brand.js";
import TypeRouter from "./src/routes/type.js";
import EncapRouter from "./src/routes/encap.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/item", item);
app.use("/inquiry", inquiry);
app.use("/purchase", purchase);
app.use("/stock", StockRouter);
app.use("/brand", BrandRouter);
app.use("/type", TypeRouter);
app.use("/encap", EncapRouter);

try {
  mongoose.connect(`${CONNECT}/${CONNECTDB}`);
} catch (err) {
  console.log(err);
}

app.listen(3001);
