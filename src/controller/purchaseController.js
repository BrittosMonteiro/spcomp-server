import { createPurchaseCommand } from "../commands/purchaseCommands.js";
import {
  created,
  errorCouldNotLoad,
  errorServiceUnavailable,
  noContent,
  successMessage,
} from "../handlers/returns.js";
import PurchaseItemModel from "../model/purchaseModel.js";

export async function createPurchase(req, res) {
  const idInquiryItem = req.body;

  if (!idInquiryItem) {
    return noContent(res, "No content");
  }

  await new PurchaseItemModel(idInquiryItem)
    .save()
    .then((response) => {
      if (response) {
        return created(res, "Purchase set");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function readPurchase(req, res) {
  let items = [];

  await PurchaseItemModel.find()
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
        return res.json(docs);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function readSinglePurchase(req, res) {}

export async function updatePurchase(req, res) {
  const data = req.body;

  const updateItem = await PurchaseItemModel.findByIdAndUpdate(data.id, {
    idInquiry: data.id,
    idItem: data.idItem,
    description: data.description,
    brand: data.brand,
    type: data.type,
    encap: data.encap,
    ipi: data.ipi,
    weight: data.weight,
    note: data.note,
    step: data.step,
    status: data.status,
    quantity: data.quantity,
    unitPurchasePriceInCents: data.unitPurchasePrice * 100,
    unitSalePriceInCents: data.unitSalePrice * 100,
  });
}

export async function deletePurchase(req, res) {
  const { idInquiryItem } = req.body;

  await PurchaseItemModel.findByIdAndDelete(idInquiryItem)
    .then((response) => {
      if (response) {
        return successMessage(res, "Purchase deleted");
      } else {
        return errorCouldNotLoad(res, "Purchase could not be deleted");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}
