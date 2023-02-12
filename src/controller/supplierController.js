import {
  createSupplierCommand,
  readSuppliersCommand,
  readSupplierSimpleCommand,
} from "../commands/supplierCommands.js";
import {
  created,
  errorNotFound,
  errorServiceUnavailable,
  noContent,
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
    .where("isDeleted")
    .equals(false)
    .sort({ name: "asc" })
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

export async function readSupplierSimple(req, res) {
  let suppliersList = [];

  await SupplierModel.find()
    .where("isDeleted")
    .equals(false)
    .sort({ name: "asc" })
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const data = readSupplierSimpleCommand(doc);
          suppliersList.push(data);
        }
        return successData(res, suppliersList);
      } else {
        return noContent(res, "Supplier could not be loaded");
      }
    })
    .catch((err) => {
      return errorServiceUnavailable(res, err.message);
    });
}

export async function readSupplierById(req, res) {
  const { idSupplier } = req.params;

  await SupplierModel.findById(idSupplier)
    .where("isDeleted")
    .equals(false)
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

  await SupplierModel.findByIdAndUpdate(idSupplier, { isDeleted: true })
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
