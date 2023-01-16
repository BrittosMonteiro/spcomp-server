import { readEncapCommand } from "../commands/encapCommands.js";
import {
  created,
  errorNotFound,
  errorServiceUnavailable,
  successData,
  successMessage,
} from "../handlers/returns.js";
import EncapModel from "../model/encapModel.js";

export async function createEncap(req, res) {
  const data = req.body;

  await new EncapModel(data)
    .save()
    .then((response) => {
      if (response) {
        return created(res, "Encap created");
      } else {
        return errorServiceUnavailable(res, "Encap could not be created");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function readEncap(req, res) {
  let items = [];

  await EncapModel.find()
    .sort({ description: "asc" })
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const encap = readEncapCommand(doc);
          items.push(encap);
        }
        return successData(res, items);
      } else {
        return errorServiceUnavailable(res, "Encap could not be loaded");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function updateEncap(req, res) {
  const { idEncap, data } = req.body;

  await EncapModel.findByIdAndUpdate(idEncap, data)
    .then((response) => {
      if (response) {
        return successMessage(res, "Encap updated");
      } else {
        return errorServiceUnavailable(res, "Encap could not be updated");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function deleteEncap(req, res) {
  const { idEncap } = req.body;

  await EncapModel.findByIdAndDelete(idEncap)
    .then((response) => {
      if (response) {
        return successMessage(res, "Encap deleted");
      } else {
        return errorServiceUnavailable(res, "Encap could not be deleted");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}
