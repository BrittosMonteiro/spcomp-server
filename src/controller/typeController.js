import {
  created,
  errorNotFound,
  errorServiceUnavailable,
  successData,
  successMessage,
} from "../handlers/returns.js";
import TypeModel from "../model/typeModel.js";

export async function createType(req, res) {
  const data = req.body;

  await new TypeModel(data)
    .save()
    .then((response) => {
      if (response) {
        return created(res, "Type created");
      } else {
        return errorServiceUnavailable(res, "Type could not be created");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function readType(req, res) {
  let items = [];

  await TypeModel.find()
    .sort({ description: "asc" })
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const data = {
            id: doc._id,
            description: doc.description,
          };
          items.push(data);
        }
        return successData(res, items);
      } else {
        return errorServiceUnavailable(res, "Type list could not be loaded");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function updateType(req, res) {
  const { idType, data } = req.body;

  await TypeModel.findByIdAndUpdate(idType, data)
    .then((response) => {
      if (response) {
        return successMessage(res, "Type updated");
      } else {
        return errorServiceUnavailable(res, "Type could not be updated");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function deleteType(req, res) {
  const { idType } = req.body;

  await TypeModel.findByIdAndDelete(idType)
    .then((response) => {
      if (response) {
        return successMessage(res, "Type deleted");
      } else {
        return errorServiceUnavailable(res, "Type could not be deleted");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}
