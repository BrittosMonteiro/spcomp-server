import SupplierInquiryModel from "../model/supplierInquiryModel.js";
import SupplierModel from "../model/supplierModel.js";

export async function createInquiryList(req, res) {
  const { idInquiryHistory, items } = req.body;

  if (!idInquiryHistory) {
    return res.json({ errorMessage: "Missing idInquiryHistory", status: 404 });
  }

  await SupplierModel.find()
    .where("status")
    .equals(true)
    .then((docs) => {
      for (let doc of docs) {
        new SupplierInquiryModel({
          idInquiryHistory: idInquiryHistory,
          idSupplier: doc._id.toString(),
          nameSupplier: doc.name,
          items: items,
        }).save();
      }
      return res.json({ status: 200 });
    })
    .catch((err) => {
      return res.json({ errorMessage: err, status: 404 });
    });
}

export async function readInquiryList(req, res) {
  const { idInquiryHistory } = req.params;
  let inquiryList = [];

  await SupplierInquiryModel.find()
    .where("idInquiryHistory")
    .equals(idInquiryHistory)
    .then((response) => {
      return res.json({ response, status: 200 });
    })
    .catch((err) => {
      return res.json({ errorMessage: err, status: 404 });
    });
}

export async function readInquiryListByCompany(req, res) {
  const { idInquiryHistory, idSupplier } = req.params;
  let inquiryList = [];

  await SupplierInquiryModel.findOne()
    .where("idInquiryHistory")
    .equals(idInquiryHistory)
    .where("idSupplier")
    .equals(idSupplier)
    .then((response) => {
      const data = {
        idInquiryList: response._id.toString(),
        status: 200,
      };
      inquiryList = response.items;
      return res.json({ ...data, inquiryList });
    })
    .catch((err) => {
      return res.json({ errorMessage: err, status: 404 });
    });
}

export async function updateInquiryList(req, res) {
  const { idInquiryList, idItem, unitPrice } = req.body;

  let document = await SupplierInquiryModel.findById(idInquiryList);

  if (document) {
    let index = document.items.findIndex((e) => e.idItem === idItem);
    let newItem = document.items[index];
    newItem.unitSalePrice = unitPrice;

    await SupplierInquiryModel.findByIdAndUpdate(idInquiryList, document)
      .then(() => {
        return res.json({ status: 200 });
      })
      .catch((err) => {
        return res.json({ errorMessage: err, status: 404 });
      });
  }
}

export async function deleteInquiryList(req, res) {
  const { idInquiryList } = req.body;

  await SupplierInquiryModel.findByIdAndDelete(idInquiryList)
    .then(() => {
      return res.json({ status: 200 });
    })
    .catch((err) => {
      return res.json({ errorMessage: err, status: 404 });
    });
}
