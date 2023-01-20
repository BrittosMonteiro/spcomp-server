import {
  createInquiryListCommand,
  readInquiryListCommand,
  readSingleItemFromInquiryListCommand,
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
        for (let supplier of suppliers) {
          for (let item of items) {
            const data = createInquiryListCommand(
              supplier._id.toString(),
              idInquiryHistory,
              item
            );
            inquiryList.push(data);
          }
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
  let suppliersList = [];

  await SupplierModel.find()
    .then((response) => {
      if (response) {
        for (let supplier of response) {
          const data = {
            idSupplier: supplier._id.toString(),
            name: supplier.name,
          };
          suppliersList.push(data);
        }
      }
    })
    .catch((err) => {});

  if (suppliersList.length > 0) {
    for (let supplier of suppliersList) {
      await InquiryListModel.find()
        .where("idInquiryHistory")
        .equals(idInquiryHistory)
        .where("idSupplier")
        .equals(supplier.idSupplier)
        .populate({ path: "idSupplier", select: "name" })
        .populate({ path: "idInquiryHistory", select: "title status" })
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
        .then((docs) => {
          if (docs) {
            let items = [];
            for (let doc of docs) {
              const item = readInquiryListCommand(doc);
              items.push(item);
            }
            inquiryList.push({ supplier, idInquiryHistory, items });
          } else {
            return errorCouldNotLoad(res, "Inquiry list could not be loaded");
          }
        })
        .catch((err) => {
          return errorCouldNotLoad(res, err.message);
        });
    }
    return successData(res, inquiryList);
  } else {
    return noContent(res, "No content to be loaded");
  }
}

export async function readInquiryListByCompany(req, res) {
  const { idInquiryHistory, idSupplier } = req.params;
  let inquiryList = [];

  await InquiryListModel.find()
    .where("idInquiryHistory")
    .equals(idInquiryHistory)
    .where("idSupplier")
    .equals(idSupplier)
    .populate({ path: "idSupplier", select: "name" })
    .populate({ path: "idInquiryHistory", select: "title status" })
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
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const data = readInquiryListCommand(doc);
          inquiryList.unshift(data);
        }
        return successData(res, [
          {
            supplier: { idSupplier },
            items: inquiryList,
          },
        ]);
      } else {
        return errorCouldNotLoad(res, "History list could not be loaded");
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
    .sort({ idSupplier: "asc" })
    .populate({ path: "idSupplier", select: "name" })
    .populate({ path: "idInquiryHistory", select: "title status" })
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
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const data = readInquiryListCommand(doc);
          const supplier = {
            idSupplier: doc.idSupplier._id,
            name: doc.idSupplier.name,
          };
          console.log(supplier);
          inquiryList.push({
            supplier,
            inquiryHistory: {
              idInquiryHistory: doc.idInquiryHistory._id.toString(),
              title: doc.idInquiryHistory.title,
            },
            items: [data],
          });
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
  const idInquiryList = data.idInquiryList;
  const unitPurchasePriceInCents = data.purchasePrice * 100;

  await InquiryListModel.findByIdAndUpdate(idInquiryList, {
    unitPurchasePriceInCents,
  })
    .then((response) => {
      if (response) {
        return successMessage(res, "Price updated");
      } else {
        return errorServiceUnavailable(res, "Price could not be updated");
      }
    })
    .catch((err) => {
      return errorCouldNotLoad(res, err.message);
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
