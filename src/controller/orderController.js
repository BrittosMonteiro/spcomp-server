import {
  createOrderCommand,
  readOrderCommand,
} from "../commands/orderCommands.js";
import {
  created,
  errorCouldNotLoad,
  errorServiceUnavailable,
  noContent,
  successData,
  successMessage,
} from "../handlers/returns.js";
import OrderItemModel from "../model/orderModel.js";

export async function createOrder(req, res) {
  const idInquiryItem = req.body;

  if (!idInquiryItem) {
    return noContent(res, "No content");
  }

  await new OrderItemModel(idInquiryItem)
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

export async function readOrder(req, res) {
  let purchaseList = [];

  await OrderItemModel.find()
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
          const data = readOrderCommand(doc);
          purchaseList.push(data);
        }
        return successData(res, purchaseList);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function readOrderByUser(req, res) {
  const { idUser } = req.params;

  await OrderItemModel.find({ idUser: idUser })
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
        path: "idItem",
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
      return res.json(err.message);
    });
}

export async function readSingleOrder(req, res) {}

export async function updateOrder(req, res) {
  const data = req.body;

  const updateItem = await OrderItemModel.findByIdAndUpdate(data.id, {
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

export async function deleteOrder(req, res) {
  const { idInquiryItem } = req.body;

  await OrderItemModel.findByIdAndDelete(idInquiryItem)
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
