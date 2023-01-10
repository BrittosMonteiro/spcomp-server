import express from "express";
const InquiryItemRouter = express.Router();

import {
  createInquiryItem,
  readInquiryItems,
  updateInquiryItem,
  deleteInquiryItem,
} from "../controller/inquiryItemController.js";

InquiryItemRouter.post("/", createInquiryItem);
InquiryItemRouter.get("/", readInquiryItems);
InquiryItemRouter.put("/", updateInquiryItem);
InquiryItemRouter.delete("/", deleteInquiryItem);

export default InquiryItemRouter;
