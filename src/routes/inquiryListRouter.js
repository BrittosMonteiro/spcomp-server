import express from "express";
const InquiryListRouter = express.Router();

import {
  createInquiryList,
  readInquiryList,
  readInquiryListByCompany,
  readSingleItemFromInquiryList,
  updateInquiryList,
  deleteInquiryList,
} from "../controller/inquiryListController.js";

InquiryListRouter.post("/", createInquiryList);
InquiryListRouter.get("/:idInquiryHistory", readInquiryList);
InquiryListRouter.get(
  "/listByCompany/:idInquiryHistory/:idSupplier",
  readInquiryListByCompany
);
InquiryListRouter.get("/single/:idInquiryItem", readSingleItemFromInquiryList);
InquiryListRouter.put("/", updateInquiryList);
InquiryListRouter.delete("/", deleteInquiryList);

export default InquiryListRouter;
