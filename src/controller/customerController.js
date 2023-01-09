import CustomerModel from "../model/customerModel.js";

export async function createCustomer(req, res) {
  const customer = req.body;

  const customerModel = new CustomerModel({
    name: customer.name,
    cnpj: customer.cnpj,
    contact: customer.contact,
    email: customer.email,
    phone: customer.phone,
    status: customer.status,
  });

  const create = await customerModel.save();

  return res.send(create);
}

export async function getCustomersList(req, res) {
  let customersList = [];

  await CustomerModel.find()
    .sort({ name: "asc" })
    .then((docs) => {
      for (let doc of docs) {
        const customer = {
          id: doc._id,
          name: doc.name,
          cnpj: doc.cnpj,
          contact: doc.contact,
          email: doc.email,
          phone: doc.phone,
          status: doc.status,
        };
        customersList.push(customer);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return res.json(customersList);
}

export async function getCustomerById(req, res) {
  const { id } = req.body;

  const customer = await CustomerModel.findById(id)
    .then((doc) => {
      const data = {
        id: doc._id,
        name: doc.name,
        cnpj: doc.cnpj,
        contact: doc.contact,
        email: doc.email,
        phone: doc.phone,
        status: doc.status,
      };

      return data;
    })
    .catch((err) => {
      console.log(err);
    });

  return res.json(customer);
}

export async function updateCustomer(req, res) {
  const customer = req.body;

  const updateCustomer = await CustomerModel.findByIdAndUpdate(customer.id, {
    name: customer.name,
    cnpj: customer.cnpj,
    contact: customer.contact,
    email: customer.email,
    phone: customer.phone,
    status: customer.status,
  });

  return res.send(updateCustomer);
}

export async function removeCustomer(req, res) {
  const { id } = req.body;

  const removeCustomer = await CustomerModel.findByIdAndDelete(id);

  return res.json(removeCustomer);
}
