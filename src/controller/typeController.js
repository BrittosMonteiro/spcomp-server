import TypeModel from "../model/typeModel.js";

export async function createType(req, res) {
  const data = req.body;

  await new TypeModel(data)
    .save()
    .then((response) => {
      if (response) {
        return res.status(201).json({ message: "Type created" });
      } else {
        return res
          .status(404)
          .json({ errorMessage: "Type could not be created" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ errorMessage: err.message });
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
        return res.status(200).json({ data: items });
      } else {
        return res
          .status(404)
          .json({ errorMessage: "Types could not be loaded" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ errorMessage: err.message });
    });
}

export async function updateType(req, res) {
  const { idType, data } = req.body;

  await TypeModel.findByIdAndUpdate(idType, data)
    .then((response) => {
      if (response) {
        return res.status(200).json({ message: "Type updated" });
      } else {
        return res
          .status(404)
          .json({ errorMessage: "Type could not be updated" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ errorMessage: err.message });
    });
}

export async function deleteType(req, res) {
  const { idType } = req.body;

  await TypeModel.findByIdAndDelete(idType)
    .then((response) => {
      if (response) {
        return res.status(200).json({ message: "Type deleted" });
      } else {
        return res
          .status(404)
          .json({ errorMessage: "Type could not be deleted" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ errorMessage: err.message });
    });
}
