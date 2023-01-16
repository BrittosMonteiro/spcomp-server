import {
  createInquiryHistoryCommand,
  readInquiryHistoryCommand,
  updateInquiryHistoryCommand,
} from "../commands/inquiryHistoryCommands.js";
import {
  createdData,
  errorNotFound,
  errorServiceUnavailable,
  successData,
  successMessage,
} from "../handlers/returns.js";
import InquiryHistoryModel from "../model/inquiryHistoryModel.js";

export async function createInquiryHistory(req, res) {
  const data = req.body;
  const inquiryHistory = createInquiryHistoryCommand(data);

  await new InquiryHistoryModel(inquiryHistory)
    .save()
    .then((response) => {
      if (response) {
        return createdData(res, response._id.toString());
      } else {
        return errorServiceUnavailable(
          res,
          "Inquiry History could not be created"
        );
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function readInquiryHistory(req, res) {
  let inquiryHistoryList = [];

  await InquiryHistoryModel.find()
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const inquiryHistory = readInquiryHistoryCommand(doc);
          inquiryHistoryList.unshift(inquiryHistory);
        }
        return successData(res, inquiryHistoryList);
      } else {
        return errorServiceUnavailable(
          res,
          "Inquiry history could not be loaded"
        );
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function readActiveInquiryHistory(req, res) {
  let inquiryHistoryList = [];

  await InquiryHistoryModel.find()
    .where("status")
    .equals(true)
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const inquiryHistory = readInquiryHistoryCommand(doc);
          inquiryHistoryList.unshift(inquiryHistory);
        }
        return successData(res, inquiryHistoryList);
      } else {
        return errorServiceUnavailable(
          res,
          "Inquiry history could not be loaded"
        );
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function updateInquiryHistory(req, res) {
  const { idInquiryHistory, data } = req.body;
  const inquiryHistory = updateInquiryHistoryCommand(data);

  await InquiryHistoryModel.findByIdAndUpdate(idInquiryHistory, inquiryHistory)
    .then((response) => {
      if (response) {
        return successMessage(res, "Inquiry history updated");
      } else {
        return errorServiceUnavailable(
          res,
          "Inquiry history could not be updated"
        );
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function deleteInquiryHistory(req, res) {
  const { idInquiryHistory } = req.body;

  await InquiryHistoryModel.findByIdAndDelete(idInquiryHistory)
    .then((response) => {
      if (response) {
        return successMessage(res, "Inquiry history deleted");
      } else {
        return errorServiceUnavailable(
          res,
          "Inquiry history could not be deleted"
        );
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}
