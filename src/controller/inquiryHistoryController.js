import InquiryHistoryModel from "../model/inquiryHistoryModel.js";

export async function createInquiryHistory(req, res) {
  const { title } = req.body;

  await new InquiryHistoryModel({
    title,
    status: true,
  })
    .save()
    .then((response) => {
      return res.json({
        idInquiryHistory: response._id.toString(),
        status: 200,
      });
    })
    .catch((err) => {
      return res.json({ errorMessage: err, status: 404 });
    });
}

export async function readInquiryHistory(req, res) {
  let inquiryHistoryList = [];

  await InquiryHistoryModel.find()
    .then((docs) => {
      for (let doc of docs) {
        const history = {
          id: doc._id,
          title: doc.title,
          status: doc.status,
        };
        inquiryHistoryList.unshift(history);
      }

      return res.json({ data: inquiryHistoryList, status: 200 });
    })
    .catch((err) => {
      return res.json({ errorMessage: err, status: 404 });
    });
}

export async function readActiveInquiryHistory(req, res) {
  let inquiryHistoryList = [];

  await InquiryHistoryModel.find()
    .where("status")
    .equals(true)
    .then((docs) => {
      for (let doc of docs) {
        const history = {
          id: doc._id,
          title: doc.title,
        };
        inquiryHistoryList.unshift(history);
      }

      return res.json({ data: inquiryHistoryList, status: 200 });
    })
    .catch((err) => {
      return res.json({ errorMessage: err, status: 404 });
    });
}

export async function updateInquiryHistory(req, res) {
  const { idInquiryHistory, status } = req.body;

  await InquiryHistoryModel.findByIdAndUpdate(idInquiryHistory, {
    status: status,
  })
    .then((response) => {
      return res.json({ data: response, status: 200 });
    })
    .catch((err) => {
      return res.json({ errorMessage: err, status: 404 });
    });
}

export async function deleteInquiryHistory(req, res) {
  const { idInquiryHistory } = req.body;

  await InquiryHistoryModel.findByIdAndDelete(idInquiryHistory)
    .then((response) => {
      return res.json({ data: response, status: 200 });
    })
    .catch((err) => {
      return res.json({ errorMessage: err, status: 404 });
    });
}
