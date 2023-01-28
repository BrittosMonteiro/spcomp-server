import {
  readOrderCommand,
  readOrderListByCompanyCommand,
  readOrderListByStockCommand,
  readOrderListByUserCommand,
} from "../commands/orderCommands.js";
import {
  errorCouldNotLoad,
  errorServiceUnavailable,
  successMessage,
  successData,
} from "../handlers/returns.js";
import OrderListModel from "../model/orderListModel.js";

export async function createOrderListItem(req, res) {
  const { idInquiryItem } = req.body;

  await new OrderListModel({
    idInquiryItem: idInquiryItem,
  })
    .save()
    .then((responseCreate) => {
      if (responseCreate) {
        return successMessage(res, "Item sent to supplier");
      } else {
        return errorCouldNotLoad(res, "Item could not be sent to supplier");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function readOrderList(req, res) {
  let purchaseList = [];

  await OrderListModel.find()
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
      } else {
        return errorCouldNotLoad(req, "Could not load");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function readOrderListByUser(req, res) {
  const { idUser } = req.params;
  let purchaseList = [];

  await OrderListModel.find()
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
          const data = readOrderListByUserCommand(doc);
          purchaseList.push(data);
        }
        const purchaseListFiltered = purchaseList.filter(
          (e) => e.user.id === idUser
        );
        return successData(res, purchaseListFiltered);
      } else {
        return errorCouldNotLoad(req, "Could not load");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function readOrderListByCompany(req, res) {
  const { idCompany } = req.params;
  let purchaseList = [];

  await OrderListModel.find()
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
          const data = readOrderListByCompanyCommand(doc);
          purchaseList.push(data);
        }
        const purchaseListFiltered = purchaseList.filter(
          (e) => e.supplier.id === idCompany
        );
        return successData(res, purchaseListFiltered);
      } else {
        return errorCouldNotLoad(req, "Could not load");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function readOrderListByStock(req, res) {
  let purchaseList = [];

  await OrderListModel.find()
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
          const data = readOrderListByStockCommand(doc);
          purchaseList.push(data);
        }

        const purchaseListFiltered = purchaseList.filter(
          (e) => e.item.step === 6
        );
        return successData(res, purchaseListFiltered);
      } else {
        return errorCouldNotLoad(req, "Could not load");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function deleteOrderListItem(req, res) {
  const { idInquiryItem } = req.body;

  await OrderListModel.deleteOne({ idInquiryItem: idInquiryItem })
    .then((responseDelete) => {
      if (responseDelete) {
        return successMessage(res, "Order item from suppliers's list deleted");
      } else {
        return errorServiceUnavailable(res, "Order item could not be deleted");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}
