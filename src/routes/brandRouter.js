import express from "express";
const BrandRouter = express.Router();

import {
  createBrand,
  readBrands,
  updateBrand,
  deleteBrand,
} from "../controller/brandController.js";

BrandRouter.post("/", createBrand);
BrandRouter.get("/", readBrands);
BrandRouter.put("/", updateBrand);
BrandRouter.delete("/", deleteBrand);

export default BrandRouter;
