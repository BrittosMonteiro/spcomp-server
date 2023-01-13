import EncapModel from "../model/encapModel.js";

export async function createEncap(req, res) {
  const data = req.body;

  await new EncapModel(data)
    .save()
    .then((response) => {
      if (response) {
        return res.status(201).json({ message: "Encap created" });
      } else {
        return res
          .status(404)
          .json({ errorMessage: "Encap could not be created" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ errorMessage: err.message });
    });
}

export async function readEncap(req, res) {
  let items = [];

  await EncapModel.find()
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
          .json({ errorMessage: "Encap could not be loaded" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ errorMessage: err.message });
    });
}

export async function updateEncap(req, res) {
  const { idEncap, data } = req.body;

  await EncapModel.findByIdAndUpdate(idEncap, data)
    .then((response) => {
      if (response) {
        return res.status(200).json({ message: "Encap updated" });
      } else {
        return res
          .status(200)
          .json({ errorMessage: "Encap could no be updated" });
      }
    })
    .catch((err) => {
      return res.status(200).json({ errorMessage: err.message });
    });
}

export async function deleteEncap(req, res) {
  const { idEncap } = req.body;

  await EncapModel.findByIdAndDelete(idEncap)
    .then((response) => {
      if (response) {
        return res.status(200).json({ message: "Encap deleted" });
      } else {
        return res
          .status(200)
          .json({ errorMessage: "Encap could not be deleted" });
      }
    })
    .catch((err) => {
      return res.status(200).json({ errorMessage: err.message });
    });
}
