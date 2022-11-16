import SupplierModel from "../model/supplier.js";

export async function createSupplier(req, res) {
  const supplier = req.body;

  const supplierModel = new SupplierModel({
    name: supplier.supplierName,
    contact: supplier.contactName,
    email: supplier.email,
    status: supplier.status,
    observation: supplier.observation,
  });

  const create = await supplierModel.save();

  return res.send(create);
}

export async function getSuppliersList(req, res) {
  let suppliersList = [];

  await SupplierModel.find()
    .then((docs) => {
      for (let doc of docs) {
        const supplier = {
          id: doc._id,
          name: doc.name,
          contact: doc.contact,
          email: doc.email,
          status: doc.status,
          observation: doc.observation,
        };
        suppliersList.push(supplier);
      }
    })
    .catch((err) => console.log(err));

  return res.json(suppliersList);
}

export async function getSupplierById(req, res) {
  const { id } = req.body;

  const supplier = await SupplierModel.findById(id);

  return res.json(supplier);
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
