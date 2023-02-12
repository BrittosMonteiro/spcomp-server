import {
  errorServiceUnavailable,
  created,
  successData,
  noContent,
  successMessage,
} from "../handlers/returns.js";
import ImportsHistoryModel from "../model/importsModel.js";

export async function createImportHistory(req, res) {
  const data = req.body;

  await new ImportsHistoryModel(data)
    .save()
    .then((responseCreate) => {
      if (responseCreate) {
        return created(res, "Import history created");
      } else {
        return res
          .status(409)
          .json({ message: "Import history could not be created" });
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function readImportHistory(req, res) {
  let importHistoryList = [];

  await ImportsHistoryModel.find()
    .where("isDeleted")
    .equals(false)
    .then((responseRead) => {
      if (responseRead) {
        for (let doc of responseRead) {
          importHistoryList.unshift({
            idImportHistory: doc._id.toString(),
            title: doc.title,
            createdAt: new Date(doc.createdAt).toLocaleDateString(),
            status: doc.status,
          });
        }
        return successData(res, importHistoryList);
      } else {
        return noContent(res, "Could not load import history");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function updateImportHistory(req, res) {
  const { idImportHistory, data } = req.body;

  await ImportsHistoryModel.findByIdAndUpdate(idImportHistory, data)
    .then((responseUpdate) => {
      if (responseUpdate) {
        return successMessage(res, "Import history status changed");
      } else {
        return noContent(res, "Import history status could not be changed");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function deleteImportHistory(req, res) {
  const { idImportHistory } = req.body;

  await ImportsHistoryModel.findByIdAndUpdate(idImportHistory, {
    isDeleted: true,
  })
    .then((responseDelete) => {
      if (responseDelete) {
        return successMessage(res, "Import history deleted");
      } else {
        return noContent(res, "Import history not deleted");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}
