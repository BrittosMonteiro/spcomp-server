import SupplierModel from "../model/supplierModel.js";

export async function createSupplier(req, res) {
  const supplier = req.body;

  const supplierModel = new SupplierModel({
    name: supplier.supplierName,
    contact: supplier.contactName,
    email: supplier.email,
    status: supplier.status,
    observation: supplier.observation,
    password: supplier.password,
    role: 4,
    isAdmin: false,
    username: supplier.username,
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
