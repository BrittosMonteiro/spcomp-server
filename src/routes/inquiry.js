import express from "express";
const Router = express.Router();

import {
  addItemToInquiryList,
  updateItemInInquiryList,
  deleteAllItemsFromInquiryList,
  deleteItemFromInquiryList,
  getAllItemsFromInquiryList,
} from "../controller/inquiryController.js";

Router.post("/", addItemToInquiryList);

Router.get("/", getAllItemsFromInquiryList);

Router.put("/", updateItemInInquiryList);

Router.delete("/", deleteItemFromInquiryList);

Router.delete("/deleteAll", deleteAllItemsFromInquiryList);

export default Router;
