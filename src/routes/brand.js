import express from "express";
const BrandRouter = express.Router();

import { getBrandList, postBrand } from "../controller/brandController.js";

BrandRouter.post("/", postBrand);

BrandRouter.get("/", getBrandList);

BrandRouter.put("/");

BrandRouter.delete("/");

export default BrandRouter;
