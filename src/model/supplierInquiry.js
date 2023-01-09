import mongoose from "mongoose";

const supplierInquirySchema = new mongoose.Schema({
  title: String,
  suppliers: Array,
  status: Boolean,
});

const SupplierInquiryModel = mongoose.model(
  "supplierInquiry",
  supplierInquirySchema
);

export default SupplierInquiryModel;
