import express from "express";
const InquiryListRouter = express.Router();

import {
  createInquiryList,
  readInquiryList,
  readInquiryListByCompany,
  updateInquiryList,
  deleteInquiryList,
} from "../controller/inquiryListController.js";

InquiryListRouter.post("/", createInquiryList);
InquiryListRouter.get("/:idInquiryHistory", readInquiryList);
InquiryListRouter.get(
  "/listByCompany/:idInquiryHistory/:idSupplier",
  readInquiryListByCompany
);
InquiryListRouter.put("/", updateInquiryList);
InquiryListRouter.delete("/", deleteInquiryList);

export default InquiryListRouter;
