import { readItemCommand } from "../commands/itemCommands.js";
import {
  created,
  errorNotFound,
  errorServiceUnavailable,
  successData,
  successMessage,
} from "../handlers/returns.js";
import ItemModel from "../model/ItemModel.js";

export async function createItem(req, res) {
  const data = req.body;

  await new ItemModel(data)
    .save()
    .then((response) => {
      if (response) {
        return created(res, "Item created");
      } else {
        return errorServiceUnavailable(res, "Item could not be created");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function readItems(req, res) {
  let itemsList = [];

  await ItemModel.find()
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const item = readItemCommand(doc);
          itemsList.unshift(item);
        }
        return successData(res, itemsList);
      } else {
        return errorServiceUnavailable(res, "Item could not be loaded");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });

  return res.json(items);
}

export async function updateItem(req, res) {
  const { idItem, data } = req.body;

  await ItemModel.findByIdAndUpdate(idItem, data)
    .then((response) => {
      if (response) {
        return successMessage(res, "Item updated");
      } else {
        return errorServiceUnavailable(res, "Item could not be loaded");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function deleteItem(req, res) {
  const { idItem } = req.body;

  await ItemModel.findByIdAndDelete(idItem)
    .then((response) => {
      if (response) {
        return successMessage(res, "Item deleted");
      } else {
        return errorServiceUnavailable(res, "Item could not be deleted");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}
