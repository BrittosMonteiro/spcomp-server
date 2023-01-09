import mongoose from "mongoose";

const supplierInquirySchema = new mongoose.Schema({
  idInquiryHistory: String,
  idSupplier: String,
  nameSupplier: String,
  items: Array,
});

const SupplierInquiryModel = mongoose.model(
  "supplierInquiry",
  supplierInquirySchema
);

export default SupplierInquiryModel;
