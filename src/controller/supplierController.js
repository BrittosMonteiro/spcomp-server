import {
  createSupplierCommand,
  readSuppliersCommand,
} from "../commands/supplierCommands.js";
import {
  created,
  errorNotFound,
  errorServiceUnavailable,
  successData,
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

  await SupplierModel.findById(idSupplier);
  //continuar implementação
}

export async function updateSupplier(req, res) {
  const supplier = req.body;

  const updateSupplier = await SupplierModel.findByIdAndUpdate(supplier.id, {
    name: supplier.supplierName,
    contact: supplier.contactName,
    email: supplier.email,
    status: supplier.status,
    observation: supplier.observation,
  });

  return res.json(updateSupplier);
}

export async function removeSupplier(req, res) {
  const { id } = req.body;
  const removeSupplier = await SupplierModel.findByIdAndDelete(id);

  return res.json(removeSupplier);
}

export async function loginSupplier(req, res) {
  const data = req.body;

  const getSupplierLogin = await SupplierModel.findOne()
    .where("username")
    .equals(data.username);

  if (getSupplierLogin && getSupplierLogin.password === data.password) {
    const data = {
      username: getSupplierLogin.username,
      isAdmin: getSupplierLogin.isAdmin,
      token: getSupplierLogin._id,
      role: getSupplierLogin.role,
    };
    return res.json({ data, status: 200 });
  }

  return res.json({ status: 404 });
}
