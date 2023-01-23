import {
  errorCouldNotLoad,
  errorServiceUnavailable,
  successMessage,
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
