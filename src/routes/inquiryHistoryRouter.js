import express from "express";
const InquiryHistoryRouter = express.Router();

import {
  createInquiryHistory,
  readInquiryHistory,
  updateInquiryHistory,
  deleteInquiryHistory,
} from "../controller/inquiryHistoryController.js";

InquiryHistoryRouter.post("/", createInquiryHistory);
InquiryHistoryRouter.get("/", readInquiryHistory);
InquiryHistoryRouter.put("/", updateInquiryHistory);
InquiryHistoryRouter.delete("/", deleteInquiryHistory);

export default InquiryHistoryRouter;
