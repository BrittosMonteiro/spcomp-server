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
    .then((docs) => {
      for (let doc of docs) {
        const data = {
          idInquiryList: doc._id.toString(),
          idInquiryHistory,
          idSupplier: doc.idSupplier,
          nameSupplier: doc.nameSupplier,
          items: doc.items,
        };
        inquiryList.unshift(data);
      }
      return res.json({ inquiryList, status: 200 });
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
    .then((doc) => {
      const data = {
        idInquiryList: doc._id.toString(),
        idInquiryHistory,
        idSupplier: doc.idSupplier,
        nameSupplier: doc.nameSupplier,
        items: doc.items,
      };
      inquiryList.unshift(data);
      return res.json({ inquiryList, status: 200 });
    })
    .catch((err) => {
      return res.json({ errorMessage: err, status: 404 });
    });
}

export async function readSingleItemFromInquiryList(req, res) {
  const { idInquiryItem } = req.params;
  let inquiryList = [];

  await SupplierInquiryModel.find()
    .where("item.idInquiryItem")
    .equals(idInquiryItem)
    .then((docs) => {
      for (let doc of docs) {
        const data = {
          idInquiryList: doc._id.toString(),
          idInquiryHistory: doc.idInquiryHistory,
          idSupplier: doc.idSupplier,
          nameSupplier: doc.nameSupplier,
          item: "",
        };
        data.item = doc.items.filter(
          (item) => item.idInquiryItem === idInquiryItem
        );

        if (data.item.length > 0) {
          inquiryList.unshift(data);
        }
      }
      return res.json({ inquiryList, status: 200 });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ errorMessage: err, status: 404 });
    });
}

export async function updateInquiryList(req, res) {
  const { idInquiryList, idInquiryItem, unitPurchasePrice } = req.body;

  let document = await SupplierInquiryModel.findById(idInquiryList);

  if (document) {
    let index = document.items.findIndex(
      (e) => e.idInquiryItem === idInquiryItem
    );
    let newItem = document.items[index];
    newItem.unitPurchasePrice = unitPurchasePrice;

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
