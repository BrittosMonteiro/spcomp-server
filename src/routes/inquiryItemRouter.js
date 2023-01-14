import express from "express";
const InquiryItemRouter = express.Router();

import {
  createInquiryItem,
  readInquiryItems,
  readInquiryItemQtyByUser,
  updateInquiryItem,
  updateInquiryItemPrice,
  deleteInquiryItem,
} from "../controller/inquiryItemController.js";

InquiryItemRouter.post("/", createInquiryItem);
InquiryItemRouter.get("/", readInquiryItems);
InquiryItemRouter.get("/qtyByUser/:idUser", readInquiryItemQtyByUser);
InquiryItemRouter.put("/", updateInquiryItem);
InquiryItemRouter.put("/updateInquiryItemPrice", updateInquiryItemPrice);
InquiryItemRouter.delete("/", deleteInquiryItem);

export default InquiryItemRouter;
