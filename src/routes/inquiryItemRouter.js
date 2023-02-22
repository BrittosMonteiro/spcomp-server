import express from "express";
const InquiryItemRouter = express.Router();

import {
  createInquiryItem,
  readInquiryItems,
  readInquiryItemsAdmin,
  readInquiryItemQtyByUser,
  updateInquiryItem,
  updateInquiryItemPrice,
  updateInquiryItemStep,
  deleteInquiryItem,
} from "../controller/inquiryItemController.js";

InquiryItemRouter.post("/", createInquiryItem);
InquiryItemRouter.get("/", readInquiryItems);
InquiryItemRouter.get("/admin", readInquiryItemsAdmin);
InquiryItemRouter.get("/qtyByUser/:idUser", readInquiryItemQtyByUser);
InquiryItemRouter.put("/", updateInquiryItem);
InquiryItemRouter.put("/updateStep", updateInquiryItemStep);
InquiryItemRouter.put("/updateInquiryItemPrice", updateInquiryItemPrice);
InquiryItemRouter.delete("/", deleteInquiryItem);

export default InquiryItemRouter;
