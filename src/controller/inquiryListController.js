import {
  readInquiryListByHistoryId,
  readInquiryListByInquiryId,
  readInquiryListByCompanyCommand,
} from "../commands/inquiryListCommands.js";
import {
  errorCouldNotLoad,
  errorServiceUnavailable,
  noContent,
  successData,
  successMessage,
} from "../handlers/returns.js";
import InquiryListModel from "../model/inquiryListModel.js";
import SupplierModel from "../model/supplierModel.js";
import { exportInquiryListToExcel } from "./download.js";

export async function createInquiryList(req, res) {
  const { idInquiryHistory, items } = req.body;
  const inquiryList = [];

  await SupplierModel.find()
    .where("status")
    .equals(true)
    .then((suppliers) => {
      if (suppliers) {
        for (let item of items) {
          let suppliersList = [];
          for (let supplier of suppliers) {
            const data = {
              idSupplier: supplier._id,
              name: supplier.name,
              unitPurchasePriceInCents: 0,
              leadtime: "",
              datacode: "",
              condition: "",
            };
            suppliersList.push(data);
          }
          const data = {
            idInquiryHistory,
            idInquiryItem: item,
            prices: suppliersList,
          };
          inquiryList.push(data);
        }
      } else {
        return errorCouldNotLoad(res, "Supplier could not be loaded");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });

  await InquiryListModel.insertMany(inquiryList)
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

  await InquiryListModel.find()
    .where("idInquiryHistory")
    .equals(idInquiryHistory)
    .populate({
      path: "idInquiryHistory",
    })
    .populate({
      path: "idInquiryItem",
      select: "quantity idItem idUser idCustomer",
      populate: {
        path: "idUser idCustomer idItem",
        select: "description idBrand idEncap idType username name",
      },
    })
    .populate({
      path: "idInquiryItem",
      select: "quantity idItem idUser idCustomer",
      populate: {
        path: "idItem",
        populate: {
          path: "idBrand",
        },
      },
    })
    .populate({
      path: "idInquiryItem",
      select: "quantity idItem idUser idCustomer",
      populate: {
        path: "idItem",
        populate: {
          path: "idEncap",
        },
      },
    })
    .populate({
      path: "idInquiryItem",
      select: "quantity idItem idUser idCustomer",
      populate: {
        path: "idItem",
        populate: {
          path: "idType",
        },
      },
    })
    .then((responseRead) => {
      if (responseRead) {
        for (let doc of responseRead) {
          const data = readInquiryListByHistoryId(doc);
          for (let price of doc.prices) {
            price = {
              ...price,
              name: price.name,
              unitPurchasePrice: price.unitPurchasePriceInCents / 100,
              leadtime: price.leadtime,
              datacode: price.datacode,
              condition: price.condition,
            };
            data.prices.push(price);
          }
          inquiryList.push(data);
        }
        return successData(res, inquiryList);
      }
    });
}

export async function readInquiryListByCompany(req, res) {
  const { idInquiryHistory, idSupplier } = req.params;
  let inquiryList = [];

  await InquiryListModel.find()
    .where("idInquiryHistory")
    .equals(idInquiryHistory)
    .populate({ path: "idInquiryHistory", select: "title status" })
    .populate({
      path: "idInquiryItem",
      select: "quantity idItem idUser idCustomer step",
      populate: {
        path: "idUser idCustomer idItem",
        select: "description idBrand idEncap idType username name",
      },
    })
    .populate({
      path: "idInquiryItem",
      select: "quantity idItem idUser idCustomer step",
      populate: {
        path: "idItem",
        populate: {
          path: "idBrand",
        },
      },
    })
    .populate({
      path: "idInquiryItem",
      select: "quantity idItem idUser idCustomer step",
      populate: {
        path: "idItem",
        populate: {
          path: "idEncap",
        },
      },
    })
    .populate({
      path: "idInquiryItem",
      select: "quantity idItem idUser idCustomer step",
      populate: {
        path: "idItem",
        populate: {
          path: "idType",
        },
      },
    })
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const data = readInquiryListByCompanyCommand(doc);
          const price = doc.prices.filter(
            (e) => e.idSupplier.toString() === idSupplier
          );
          data.prices.push({
            idSupplier: price[0].idSupplier,
            name: price[0].name,
            unitPurchasePrice: price[0].unitPurchasePriceInCents / 100,
            leadtime: price[0].leadtime,
            datacode: price[0].datacode,
            condition: price[0].condition,
          });
          inquiryList.push(data);
        }
        return successData(res, inquiryList);
      } else {
        return noContent(res, "History list could not be loaded");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function readSingleItemFromInquiryList(req, res) {
  const { idInquiryItem } = req.params;
  let inquiryList = [];

  await InquiryListModel.find()
    .where("idInquiryItem")
    .equals(idInquiryItem)
    .populate({ path: "idInquiryHistory", select: "title status" })
    .populate({
      path: "idInquiryItem",
      select: "quantity idItem idUser idCustomer step",
      populate: {
        path: "idUser idCustomer idItem",
        select: "description idBrand idEncap idType username name",
      },
    })
    .populate({
      path: "idInquiryItem",
      select: "quantity idItem idUser idCustomer step",
      populate: {
        path: "idItem",
        populate: {
          path: "idBrand",
        },
      },
    })
    .populate({
      path: "idInquiryItem",
      select: "quantity idItem idUser idCustomer step",
      populate: {
        path: "idItem",
        populate: {
          path: "idEncap",
        },
      },
    })
    .populate({
      path: "idInquiryItem",
      select: "quantity idItem idUser idCustomer step",
      populate: {
        path: "idItem",
        populate: {
          path: "idType",
        },
      },
    })
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          for (let price of doc.prices) {
            const data = readInquiryListByInquiryId(doc, price);
            inquiryList.push(data);
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
  const data = req.body;

  await InquiryListModel.findById(data.idInquiryList)
    .then((responseFind) => {
      if (responseFind) {
        manageInquiryListItemUpdate(responseFind, data.price, res);
      } else {
        return noContent(res, "Não foi possível alterar");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function manageInquiryListItemUpdate(item, data, res) {
  const pos = item.prices.findIndex(
    (e) => e.idSupplier.toString() === data.idSupplier
  );

  item.prices[pos] = {
    ...item.prices[pos],
    unitPurchasePriceInCents: data.unitPurchasePrice * 100,
    leadtime: data.leadtime,
    datacode: data.datacode,
    condition: data.condition,
  };

  await InquiryListModel.findByIdAndUpdate(item._id, item)
    .then((responseUpdate) => {
      if (responseUpdate) {
        return successMessage(res, "Item updated");
      } else {
        return noContent(res, "Item could not be updated");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function deleteInquiryList(req, res) {
  const { idInquiryList } = req.body;

  await InquiryListModel.findByIdAndDelete(idInquiryList)
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

  await InquiryListModel.find()
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
      return res.download(`./public/inquiries/${title}.xlsx`);
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}
