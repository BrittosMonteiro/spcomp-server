import express from "express";
const Router = express.Router();

import {
  addItemToInquiryList,
  updateItemInInquiryList,
  deleteAllItemsFromInquiryList,
  deleteItemFromInquiryList,
  getAllItemsFromInquiryList,
  setInquiryList,
  getInquiryListByCompany,
  updateInquiryList,
} from "../controller/inquiryController.js";

Router.post("/", addItemToInquiryList);

Router.get("/", getAllItemsFromInquiryList);

Router.put("/", updateItemInInquiryList);

Router.delete("/", deleteItemFromInquiryList);

Router.delete("/deleteAll", deleteAllItemsFromInquiryList);

Router.post("/setInquiryList", setInquiryList);

Router.post("/getInquiryListByCompany", getInquiryListByCompany);

Router.put("/updateInquiryList", updateInquiryList)

export default Router;
