import { readOrderCommand } from "../commands/OrderCommands.js";
import {
  created,
  errorCouldNotLoad,
  errorServiceUnavailable,
  noContent,
  successData,
  successMessage,
} from "../handlers/returns.js";
import RequestItemModel from "../model/requestModel.js";

export async function createRequest(req, res) {
  const idInquiryItem = req.body;

  if (!idInquiryItem) {
    return noContent(res, "No content");
  }

  await new RequestItemModel(idInquiryItem)
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

export async function readRequest(req, res) {
  let purchaseList = [];

  await RequestItemModel.find()
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

export async function readRequestByUser(req, res) {
  const { idUser } = req.params;

  await RequestItemModel.find({ idUser: idUser })
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

export async function readSingleRequest(req, res) {}

export async function updateRequest(req, res) {
  const data = req.body;

  await RequestItemModel.findByIdAndUpdate(data.idRequest, {
    reason: data.reason,
  })
    .then((responseUpdate) => {
      if (responseUpdate) {
        return successMessage(res, "Request item reason set");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function deleteRequest(req, res) {
  const { idInquiryItem } = req.body;

  await RequestItemModel.findByIdAndDelete(idInquiryItem)
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
