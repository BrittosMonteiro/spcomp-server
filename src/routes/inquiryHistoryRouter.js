import express from "express";
const InquiryHistoryRouter = express.Router();

import {
  createInquiryHistory,
  readInquiryHistory,
  readActiveInquiryHistory,
  updateInquiryHistory,
  deleteInquiryHistory,
} from "../controller/inquiryHistoryController.js";

InquiryHistoryRouter.post("/", createInquiryHistory);
InquiryHistoryRouter.get("/", readInquiryHistory);
InquiryHistoryRouter.get("/active", readActiveInquiryHistory);
InquiryHistoryRouter.put("/", updateInquiryHistory);
InquiryHistoryRouter.delete("/", deleteInquiryHistory);

export default InquiryHistoryRouter;
