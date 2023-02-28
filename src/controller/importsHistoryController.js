import {
  errorServiceUnavailable,
  created,
  successData,
  noContent,
  successMessage,
} from "../handlers/returns.js";
import ImportsHistoryModel from "../model/importsModel.js";
import OrderListModel from "../model/orderListModel.js";

export async function createImportHistory(req, res) {
  const data = req.body;

  await new ImportsHistoryModel(data)
    .save()
    .then((responseCreate) => {
      if (responseCreate) {
        return created(res, "Import history created");
      } else {
        return res
          .status(409)
          .json({ message: "Import history could not be created" });
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function readImportHistory(req, res) {
  let importHistoryList = [];

  await ImportsHistoryModel.find()
    .where("isDeleted")
    .equals(false)
    .then((responseRead) => {
      if (responseRead) {
        for (let doc of responseRead) {
          importHistoryList.unshift({
            idImportHistory: doc._id.toString(),
            title: doc.title,
            createdAt: new Date(doc.createdAt).toLocaleDateString(),
            status: doc.status,
          });
        }
        return successData(res, importHistoryList);
      } else {
        return noContent(res, "Could not load import history");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function updateImportHistory(req, res) {
  const { idImportHistory, data } = req.body;

  await ImportsHistoryModel.findByIdAndUpdate(idImportHistory, data)
    .then((responseUpdate) => {
      if (responseUpdate) {
        return successMessage(res, "Import history status changed");
      } else {
        return noContent(res, "Import history status could not be changed");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function deleteImportHistory(req, res) {
  const { idImportHistory } = req.body;

  await ImportsHistoryModel.findByIdAndUpdate(idImportHistory, {
    isDeleted: true,
  })
    .then((responseDelete) => {
      if (responseDelete) {
        return successMessage(res, "Import history deleted");
      } else {
        return noContent(res, "Import history not deleted");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function readImportItems(req, res) {
  const { idImportHistory } = req.params;
  let importItems = [];

  await OrderListModel.find()
    .where("idImportHistory")
    .equals(idImportHistory)
    .populate({ path: "idSupplier" })
    .populate({ path: "items" })
    .populate({
      path: "items",
      populate: {
        path: "idItem",
        select: "description idBrand idType idEncap",
      },
    })
    .populate({
      path: "items",
      populate: { path: "idItem", populate: { path: "idBrand" } },
    })
    .populate({
      path: "items",
      populate: { path: "idItem", populate: { path: "idType" } },
    })
    .populate({
      path: "items",
      populate: { path: "idItem", populate: { path: "idEncap" } },
    })
    .populate({ path: "items", populate: { path: "idUser" } })
    .then((responseRead) => {
      if (responseRead) {
        for (let items of responseRead) {
          for (let item of items.items) {
            const data = {
              brand: item.idItem.idBrand.description,
              description: item.idItem.description,
              encap: item.idItem.idEncap.description,
              idImportItem: items._id.toString(),
              idInquiryItem: item._id.toString(),
              idItem: item.idItem._id.toString(),
              qty: item.quantity,
              step: item.step,
              supplier: items.idSupplier.name,
              type: item.idItem.idType.description,
              unitPurchasePrice: item.unitPurchasePriceInCents / 100,
              user: item.idUser.name,
            };
            importItems.push(data);
          }
        }
        return successData(res, importItems);
      } else {
        return noContent(res, "No items found");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}
