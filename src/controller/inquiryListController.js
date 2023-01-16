import {
  createInquiryListCommand,
  readInquiryListCommand,
  readSingleItemFromInquiryListCommand,
} from "../commands/inquiryListCommands.js";
import {
  errorCouldNotLoad,
  errorServiceUnavailable,
  successData,
  successMessage,
} from "../handlers/returns.js";
import SupplierInquiryModel from "../model/supplierInquiryModel.js";
import SupplierModel from "../model/supplierModel.js";
import { exportInquiryListToExcel } from "./download.js";

export async function createInquiryList(req, res) {
  const { idInquiryHistory, items } = req.body;
  const inquiryList = [];

  await SupplierModel.find()
    .where("status")
    .equals(true)
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const data = createInquiryListCommand(doc, idInquiryHistory, items);
          inquiryList.push(data);
        }
      } else {
        return errorCouldNotLoad(res, "Supplier could not be loaded");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });

  await SupplierInquiryModel.insertMany(inquiryList)
    .then((response) => {
      if (response) {
        return successMessage(res, "Inquiry created");
      } else {
        return errorServiceUnavailable(
          res,
          "Inquiry list could not be created"
        );
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function readInquiryList(req, res) {
  const { idInquiryHistory } = req.params;
  let inquiryList = [];

  await SupplierInquiryModel.find()
    .where("idInquiryHistory")
    .equals(idInquiryHistory)
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const data = readInquiryListCommand(doc, idInquiryHistory);
          inquiryList.unshift(data);
        }
        return successData(res, inquiryList);
      } else {
        return errorCouldNotLoad(res, "Inquiry list could not be loaded");
      }
    })
    .catch((err) => {
      return errorCouldNotLoad(res, err.message);
    });
}

export async function readInquiryListToDownload(req, res) {
  const { idInquiryHistory, title } = req.body;
  const worksheetColumnNames = [
    "Quantity",
    "Type",
    "Description",
    "Encap",
    "Brand",
    "Price USD",
  ];
  let inquiryList = [];

  await SupplierInquiryModel.find()
    .where("idInquiryHistory")
    .equals(idInquiryHistory)
    .then((docs) => {
      for (let item of docs[0].items) {
        const data = {
          quantity: item.quantity,
          type: item.type,
          description: item.description,
          encap: item.encap,
          brand: item.brand,
          unitPurchasePrice: 0,
        };
        inquiryList.push(data);
      }
      exportInquiryListToExcel(inquiryList, worksheetColumnNames, title);
      return res.json({ inquiryList, status: 200 });
    })
    .catch((err) => {
      return res.json({ errorMessage: err.message, status: 404 });
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
      if (doc) {
        const data = readInquiryListCommand(doc, idInquiryHistory);
        inquiryList.unshift(data);
        return successData(res, inquiryList);
      }
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
      if (docs) {
        for (let doc of docs) {
          const data = readSingleItemFromInquiryListCommand(doc, idInquiryItem);
          if (data.item.length > 0) {
            inquiryList.unshift(data);
          }
        }
        return successData(res, inquiryList);
      } else {
        return errorCouldNotLoad(res, "Inquiry list could not be loaded");
      }
    })
    .catch((err) => {
      return errorCouldNotLoad(res, err.message);
    });
}

export async function updateInquiryList(req, res) {
  const { idInquiryList, idInquiryItem, unitPurchasePrice } = req.body;

  await SupplierInquiryModel.findById(idInquiryList)
    .then((response) => {
      if (response) {
        let index = response.items.findIndex(
          (e) => e.idInquiryItem === idInquiryItem
        );
        let newItem = response.items[index];
        newItem.unitPurchasePrice = unitPurchasePrice;

        SupplierInquiryModel.findByIdAndUpdate(idInquiryList, response)
          .then((response) => {
            if (response) {
              return successMessage(res, "Inquiry list updated");
            } else {
              return errorCouldNotLoad(
                res,
                "Inquiry list could not be updated"
              );
            }
          })
          .catch((err) => {
            return errorServiceUnavailable(res, err.message);
          });
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function deleteInquiryList(req, res) {
  const { idInquiryList } = req.body;

  await SupplierInquiryModel.findByIdAndDelete(idInquiryList)
    .then((response) => {
      if (response) {
        return successMessage(res, "Inquiry list deleted");
      } else {
        return errorCouldNotLoad(res, "Inquiry list could not be deleted");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}
