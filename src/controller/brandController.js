import { readBrandsCommand } from "../commands/brandCommands.js";
import {
  created,
  errorNotFound,
  errorServiceUnavailable,
  successData,
  successMessage,
} from "../handlers/returns.js";
import BrandModel from "../model/brandModel.js";

export async function createBrand(req, res) {
  const data = req.body;

  await new BrandModel(data)
    .save()
    .then((response) => {
      if (response) {
        return created(res, "Brand created");
      } else {
        return errorServiceUnavailable(res, "Brand could not be created");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function readBrands(req, res) {
  let items = [];

  await BrandModel.find()
    .sort({ description: "asc" })
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const brand = readBrandsCommand(doc);
          items.push(brand);
        }
        return successData(res, items);
      } else {
        return errorServiceUnavailable(res, "Brand could not be created");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function updateBrand(req, res) {
  const { idBrand, data } = req.body;

  await BrandModel.findByIdAndUpdate(idBrand, data)
    .then((response) => {
      if (response) {
        return successMessage(res, "Brand updated");
      } else {
        return errorServiceUnavailable(res, "Brand could not be created");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function deleteBrand(req, res) {
  const { idBrand } = req.body;

  await BrandModel.findByIdAndDelete(idBrand)
    .then((response) => {
      if (response) {
        return successMessage(res, "Brand deleted");
      } else {
        return errorServiceUnavailable(res, "Brand could not be created");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}
