import {
  createSupplierCommand,
  readSuppliersCommand,
} from "../commands/supplierCommands.js";
import {
  created,
  errorNotFound,
  errorServiceUnavailable,
  successData,
  successMessage,
} from "../handlers/returns.js";
import SupplierModel from "../model/supplierModel.js";

export async function createSupplier(req, res) {
  const data = req.body;
  const supplier = createSupplierCommand(data);

  await new SupplierModel(supplier)
    .save()
    .then((response) => {
      if (response) {
        return created(res, "Supplier created");
      } else {
        return errorServiceUnavailable(res, "Supplier could not be created");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function readSuppliers(req, res) {
  let suppliersList = [];

  await SupplierModel.find()
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const supplier = readSuppliersCommand(doc);
          suppliersList.push(supplier);
        }
        return successData(res, suppliersList);
      } else {
        return errorServiceUnavailable(res, "Supplier could not be loaded");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function readSupplierById(req, res) {
  const { idSupplier } = req.params;

  await SupplierModel.findById(idSupplier)
    .then((response) => {
      if (response) {
        const supplier = readSuppliersCommand(response);
        return successData(res, supplier);
      } else {
        return errorServiceUnavailable(res, "Supplier could not be loaded");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function updateSupplier(req, res) {
  const { idSupplier, supplier } = req.body;

  await SupplierModel.findByIdAndUpdate(idSupplier, supplier)
    .then((response) => {
      if (response) {
        return successMessage(res, "Supplier updated");
      } else {
        return errorServiceUnavailable(res, "Supplier could not be updated");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function deleteSupplier(req, res) {
  const { idSupplier } = req.body;

  await SupplierModel.findByIdAndDelete(idSupplier)
    .then((response) => {
      if (response) {
        return successMessage(res, "Supplier deleted");
      } else {
        return errorServiceUnavailable(res, "Suplier, could not be deleted");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}
