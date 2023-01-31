import {
  readOrderListByStockCommand,
  readOrderListByUserCommand,
} from "../commands/orderCommands.js";
import {
  created,
  errorCouldNotLoad,
  errorServiceUnavailable,
  successMessage,
  successData,
  noContent,
} from "../handlers/returns.js";
import InquiryModel from "../model/InquiryItemModel.js";
import OrderListModel from "../model/orderListModel.js";

export async function createOrderListItem(req, res) {
  const { idSupplier } = req.body;
  let itemsList = [];

  await InquiryModel.find()
    .where("idSupplier")
    .equals(idSupplier)
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          itemsList.push(doc._id.toString());
        }
        return itemsList;
      } else {
        return [];
      }
    })
    .catch((err) => {
      return [];
    });

  await new OrderListModel({
    idSupplier: idSupplier,
    items: itemsList,
  })
    .save()
    .then((responseCreate) => {
      if (responseCreate) {
        return created(res, "Order created");
      } else {
        return errorCouldNotLoad(res, "Order could not be created");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function readOrderList(req, res) {
  const { idOrder } = req.params;
  let items = [];

  await OrderListModel.findById(idOrder)
    .populate({
      path: "idSupplier",
      select: "name",
    })
    .populate({
      path: "items",
      select: "quantity unitPurchasePriceInCents idItem step",
      populate: {
        path: "idItem",
        select: "description idType idEncap idBrand",
        populate: {
          path: "idType",
          select: "description",
        },
      },
    })
    .populate({
      path: "items",
      select: "quantity unitPurchasePriceInCents idItem step",
      populate: {
        path: "idItem",
        select: "description idType idEncap idBrand",
        populate: {
          path: "idEncap",
          select: "description",
        },
      },
    })
    .populate({
      path: "items",
      select: "quantity unitPurchasePriceInCents idItem step",
      populate: {
        path: "idItem",
        select: "description idType idEncap idBrand",
        populate: {
          path: "idBrand",
          select: "description",
        },
      },
    })
    .then((doc) => {
      if (doc) {
        const data = {
          idOrder: doc._id.toString(),
          status: doc.status,
          supplier: {
            idSupplier: doc.idSupplier._id.toString(),
            name: doc.idSupplier.name,
          },
          items: [],
        };
        for (let item of doc.items) {
          item = {
            idInquiryItem: item._id.toString(),
            idItem: item.idItem._id.toString(),
            quantity: item.quantity,
            unitPurchasePrice: item.unitPurchasePriceInCents / 100,
            description: item.idItem.description,
            type: item.idItem.idType.description,
            encap: item.idItem.idEncap.description,
            brand: item.idItem.idBrand.description,
            step: item.step,
            leadtime: "",
            datacode: "",
            condition: "",
          };
          data.items.push(item);
        }
        return successData(res, data);
      } else {
        return errorCouldNotLoad(req, "Could not load");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function readOrders(req, res) {
  let orders = [];

  await OrderListModel.find()
    .populate({
      path: "idSupplier",
      select: "name",
    })
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const data = {
            date: new Date(doc.createdAt).toLocaleDateString(),
            idOrder: doc._id.toString(),
            status: doc.status,
            supplier: doc.idSupplier.name,
          };
          orders.push(data);
        }
        return successData(res, orders);
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

export async function readOrderListBySupplier(req, res) {
  const { idSupplier } = req.params;
  let orderList = [];

  await OrderListModel.find()
    .populate({
      path: "idSupplier",
      select: "name",
    })
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const data = {
            date: new Date(doc.createdAt).toLocaleDateString(),
            idOrder: doc._id.toString(),
            status: doc.status,
            supplier: doc.idSupplier.name,
            idSupplier: doc.idSupplier._id.toString(),
          };
          orderList.push(data);
        }
        const orderListFiltered = orderList.filter(
          (e) => e.idSupplier === idSupplier
        );
        return successData(res, orderListFiltered);
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

export async function updateOrderStatus(req, res) {
  const { idOrder, status } = req.body;

  await OrderListModel.findByIdAndUpdate(idOrder, { status: status })
    .then((responseUpdate) => {
      if (responseUpdate) {
        return successMessage(res, "Order status updated");
      } else {
        return noContent(res, "Order status could not be updated");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
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
