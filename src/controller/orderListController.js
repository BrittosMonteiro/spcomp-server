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
import { updateOrderInquiryItemStep } from "./inquiryItemController.js";

export async function createOrderListItem(req, res) {
  const { idSupplier } = req.body;
  let itemsList = [];

  await InquiryModel.find()
    .where("idSupplier")
    .equals(idSupplier)
    .where("step")
    .equals(4)
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
        updateOrderInquiryItemStep(itemsList, 5);
      } else {
        return noContent(res, "Order could not be created");
      }
    })
    .then((response) => {
      if (response) {
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

  await OrderListModel.findById(idOrder)
    .where("isDeleted")
    .equals(false)
    .populate({
      path: "idSupplier",
      select: "name",
    })
    .populate({
      path: "items",
      select:
        "quantity leadtime condition datacode unitPurchasePriceInCents idItem step",
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
      select:
        "quantity leadtime condition datacode unitPurchasePriceInCents idItem step",
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
      select:
        "quantity leadtime condition datacode unitPurchasePriceInCents idItem step",
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
            leadtime: item.leadtime,
            datacode: item.datacode,
            condition: item.condition,
          };
          data.items.push(item);
        }
        return successData(res, data);
      } else {
        return errorCouldNotLoad(res, "Could not load");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function readOrders(req, res) {
  let orders = [];

  await OrderListModel.find()
    .where("isDeleted")
    .equals(false)
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
        return errorCouldNotLoad(res, "Could not load");
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
          const data = readOrderListByUserCommand(doc);
          purchaseList.push(data);
        }
        const purchaseListFiltered = purchaseList.filter(
          (e) => e.user.id === idUser
        );
        return successData(res, purchaseListFiltered);
      } else {
        return errorCouldNotLoad(res, "Could not load");
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
    .where("isDeleted")
    .equals(false)
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
          (e) => e.idSupplier === idSupplier && e.status === true
        );
        return successData(res, orderListFiltered);
      } else {
        return errorCouldNotLoad(res, "Could not load");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function readOrderListByStock(req, res) {
  let purchaseList = [];

  await OrderListModel.find()
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
          const data = readOrderListByStockCommand(doc);
          purchaseList.push(data);
        }

        const purchaseListFiltered = purchaseList.filter(
          (e) => e.item.step === 6
        );
        return successData(res, purchaseListFiltered);
      } else {
        return errorCouldNotLoad(res, "Could not load");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function readOrdersByImportHistory(req, res) {
  const { idImportHistory } = req.params;

  await OrderListModel.find()
    .where("isDeleted")
    .equals(false)
    .populate({
      path: "idSupplier",
      select: "name",
    })
    .where("idImportHistory")
    .equals(idImportHistory)
    .then((responseRead) => {
      if (responseRead) {
        return successData(res, responseRead);
      } else {
        return noContent(res, "No order found");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function readOrdersNotAttached(req, res) {
  await OrderListModel.find()
    .where("isDeleted")
    .equals(false)
    .populate({
      path: "idSupplier",
      select: "name",
    })
    .then((responseRead) => {
      if (responseRead) {
        const newOrderList = responseRead.filter((e) => !e.idImportHistory);
        return successData(res, newOrderList);
      } else {
        return noContent(res, "No order found");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
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

export async function updateOrderAddItems(req, res) {
  const { idOrder, items } = req.body;

  await OrderListModel.findById(idOrder)
    .then((responseRead) => {
      if (responseRead) {
        for (let id of responseRead.items) {
          items.unshift(id.toString());
        }
        OrderListModel.findByIdAndUpdate(idOrder, { items })
          .then((responseUpdate) => {
            if (responseUpdate) {
              updateOrderInquiryItemStep(items, 5);
              return successMessage(res, "Updated");
            } else {
              return noContent(res, "Could not update");
            }
          })
          .catch((err) => {
            return errorServiceUnavailable(res, err.message);
          });
      } else {
        return errorServiceUnavailable(res, "Item could not be included");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function updateOrderImportHistoryId(req, res) {
  const { idImportHistory, idOrder } = req.body;

  await OrderListModel.findByIdAndUpdate(idOrder, { idImportHistory })
    .then((responseUpdate) => {
      if (responseUpdate) {
        return successMessage(res, "Order now has an import id");
      } else {
        return noContent(res, "Could not set import to order");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function deleteOrderListItem(req, res) {
  const { idOrder } = req.body;

  await OrderListModel.findByIdAndUpdate(idOrder, { isDeleted: true })
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
