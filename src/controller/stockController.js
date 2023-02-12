import { readStockItemCommand } from "../commands/stockCommands.js";
import {
  created,
  errorServiceUnavailable,
  successData,
} from "../handlers/returns.js";
import StockModel from "../model/stockModel.js";

export async function createStockItem(req, res) {
  const data = req.body;

  await new StockModel({ idInquiryItem: data.idInquiryItem })
    .save()
    .then((responseCreate) => {
      if (responseCreate) {
        return created(res, "Item sent to stock");
      } else {
        return errorServiceUnavailable(res, "Item could no be sent to stock");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function readStockList(req, res) {
  let items = [];

  await StockModel.find()
    .where("isDeleted")
    .equals(false)
    .populate({
      path: "idInquiryItem",
      populate: {
        path: "idItem",
      },
    })
    .populate({
      path: "idInquiryItem",
      populate: {
        path: "idUser",
        select: "name username",
      },
    })
    .populate({
      path: "idInquiryItem",
      populate: {
        path: "idCustomer",
        select: "name",
      },
    })
    .populate({
      path: "idInquiryItem",
      populate: {
        path: "idSupplier",
        select: "name",
      },
    })
    .populate({
      path: "idInquiryItem",
      populate: {
        path: "idItem",
        populate: {
          path: "idBrand",
        },
      },
    })
    .populate({
      path: "idInquiryItem",
      populate: {
        path: "idItem",
        populate: {
          path: "idEncap",
        },
      },
    })
    .populate({
      path: "idInquiryItem",
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
          const data = readStockItemCommand(doc);
          items.unshift(data);
        }
        return successData(res, items);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function updateStockItem(req, res) {}

export async function deleteStockItem(req, res) {
  const { id } = req.body;

  const remove = await StockModel.findByIdAndUpdate(id, { isDeleted: true });

  return res.send(remove);
}
