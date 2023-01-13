import BrandModel from "../model/brandModel.js";

export async function createBrand(req, res) {
  const data = req.body;

  await new BrandModel(data)
    .save()
    .then((response) => {
      if (response) {
        return res.status(201).json({ message: "Brand created" });
      } else {
        return res
          .status(404)
          .json({ errorMessage: "Brand could not be created" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ errorMessage: err.message });
    });
}

export async function readBrands(req, res) {
  let items = [];

  await BrandModel.find()
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
          .json({ errorMessage: "Brands could not be loaded" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ errorMessage: err.message });
    });
}

export async function updateBrand(req, res) {
  const { idBrand, data } = req.body;

  await BrandModel.findByIdAndUpdate(idBrand, data)
    .then((response) => {
      if (response) {
        return res.status(200).json({ message: "Brand updated" });
      } else {
        return res
          .status(404)
          .json({ errorMessage: "Brand could not be updated" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ errorMessage: err.message });
    });
}

export async function deleteBrand(req, res) {
  const { idBrand } = req.body;

  await BrandModel.findByIdAndDelete(idBrand)
    .then((response) => {
      if (response) {
        return res.status(200).json({ message: "Brand deleted" });
      } else {
        return res
          .status(404)
          .json({ errorMessage: "Brand could not be deleted" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ errorMessage: err.message });
    });
}
