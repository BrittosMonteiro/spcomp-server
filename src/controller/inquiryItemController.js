import {
  createInquiryItemCommand,
  readInquiryItemAdminCommand,
  readInquiryItemCommand,
  updateInquiryItemCommand,
  updateInquiryItemPriceCommand,
} from "../commands/inquiryItemCommands.js";
import {
  created,
  errorCouldNotLoad,
  errorServiceUnavailable,
  successData,
  successMessage,
} from "../handlers/returns.js";
import InquiryModel from "../model/InquiryItemModel.js";

export async function createInquiryItem(req, res) {
  const data = req.body;
  const inquiryItem = createInquiryItemCommand(data);

  await new InquiryModel(inquiryItem)
    .save()
    .then((response) => {
      if (response) {
        return successMessage(res, "Inquiry item created");
      } else {
        return errorServiceUnavailable(
          res,
          "Inquiry item could not be created"
        );
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function readInquiryItems(req, res) {
  let items = [];

  await InquiryModel.find()
    .where("isDeleted")
    .equals(false)
    .populate({ path: "idUser", select: "_id, username" })
    .populate({
      path: "idItem",
      populate: {
        path: "idBrand",
        select: "description",
      },
    })
    .populate({
      path: "idItem",
      populate: {
        path: "idEncap",
        select: "description",
      },
    })
    .populate({
      path: "idItem",
      populate: {
        path: "idType",
        select: "description",
      },
    })
    .populate({
      path: "idSupplier",
      select: "_id, name",
    })
    .populate({
      path: "idCustomer",
      select: "_id, name",
    })
    .exec()
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const data = readInquiryItemCommand(doc);
          items.unshift(data);
        }
        return successData(res, { level: 2, items });
      } else {
        return errorCouldNotLoad(res, "Inquiry item could not be loaded");
      }
    })
    .catch((err) => {
      return errorCouldNotLoad(res, err.message);
    });
}

export async function readInquiryItemsAdmin(req, res) {
  let items = [];

  await InquiryModel.find()
    .where("isDeleted")
    .equals(false)
    .populate({ path: "idUser", select: "_id, username" })
    .populate({
      path: "idItem",
      populate: {
        path: "idBrand",
        select: "description",
      },
    })
    .populate({
      path: "idItem",
      populate: {
        path: "idEncap",
        select: "description",
      },
    })
    .populate({
      path: "idItem",
      populate: {
        path: "idType",
        select: "description",
      },
    })
    .populate({
      path: "idSupplier",
      select: "_id, name",
    })
    .populate({
      path: "idCustomer",
      select: "_id, name",
    })
    .exec()
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const data = readInquiryItemAdminCommand(doc);
          items.unshift(data);
        }
        return successData(res, { level: 2, items });
      } else {
        return errorCouldNotLoad(res, "Inquiry item could not be loaded");
      }
    })
    .catch((err) => {
      return errorCouldNotLoad(res, err.message);
    });
}

export async function readInquiryItemQtyByUser(req, res) {
  const { idUser } = req.params;

  await InquiryModel.find()
    .where("idUser")
    .equals(idUser)
    .then((response) => {
      if (response) {
        return successData(res, response.length);
      } else {
        return errorCouldNotLoad(
          res,
          "Inquiry item quantity could not be loaded"
        );
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function updateInquiryItem(req, res) {
  const { idInquiryItem, data } = req.body;
  const inquiryItem = updateInquiryItemCommand(data);

  await InquiryModel.findByIdAndUpdate(idInquiryItem, inquiryItem)
    .then((response) => {
      if (response) {
        return successMessage(res, "Inquiry item updated");
      } else {
        return errorCouldNotLoad(res, "Inquiry item could not be loaded");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function updateInquiryItemPrice(req, res) {
  const { idInquiryItem, data } = req.body;
  const inquiryItem = updateInquiryItemPriceCommand(data);

  await InquiryModel.findByIdAndUpdate(idInquiryItem, inquiryItem)
    .then((response) => {
      if (response) {
        return successMessage(res, "Inquiry item prices and supplier updated");
      } else {
        return errorCouldNotLoad(
          res,
          "Inquiry item prices and supplier could not be updated"
        );
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });

  return;
}

export async function updateInquiryItemStep(req, res) {
  const { pending, step } = req.body;

  await InquiryModel.updateMany(
    { _id: { $in: pending } },
    { $set: { step: step } },
    { multi: true }
  )
    .then((response) => {
      if (response) {
        return successMessage(res, "Inquiry item step updated");
      } else {
        return errorServiceUnavailable(
          res,
          "Inquiry item step could not be updated"
        );
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function updateOrderInquiryItemStep(items, step) {
  await InquiryModel.updateMany(
    { _id: { $in: items } },
    { $set: { step: step } },
    { multi: true }
  );
  // .then((responseUpdate) => {
  //   if (responseUpdate) {
  //     return created(res, "Order created and step updated");
  //   } else {
  //     return errorServiceUnavailable(res, "Could not update step");
  //   }
  // })
  // .catch((err) => {
  //   return errorServiceUnavailable(res, err.message);
  // });
}

export async function deleteInquiryItem(req, res) {
  const { idInquiryItem } = req.body;

  await InquiryModel.findByIdAndUpdate(idInquiryItem, { isDeleted: true })
    .then((response) => {
      if (response) {
        return successMessage(res, "Inquiry item deleted");
      } else {
        return errorCouldNotLoad(res, "Inquiry item could not be deleted");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}
