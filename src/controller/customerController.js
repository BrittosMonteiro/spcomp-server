import CustomerModel from "../model/customerModel.js";

export async function createCustomer(req, res) {
  const customer = req.body;

  await new CustomerModel(customer)
    .save()
    .then((response) => {
      if (response) {
        return res.status(201).json({
          message: "Customer created",
        });
      } else {
        return res.status(404).json({
          errorMessage: "Customer could not be created",
        });
      }
    })
    .catch((err) => {
      return res.status(404).json({ errorMessage: err });
    });
}

export async function readCustomers(req, res) {
  let customersList = [];

  await CustomerModel.find()
    .sort({ name: "asc" })
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const customer = {
            id: doc._id.toString(),
            name: doc.name,
            cnpj: doc.cnpj,
            contact: doc.contact,
            email: doc.email,
            phone: doc.phone,
            status: doc.status,
          };
          customersList.push(customer);
        }
        return res.status(200).json({ data: customersList });
      } else {
        return res
          .status(404)
          .json({ errorMessage: "Customer could not be loaded" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ errorMessage: err.message });
    });
}

export async function readCustomerById(req, res) {
  const { idCustomer } = req.params;

  await CustomerModel.findById(idCustomer)
    .then((doc) => {
      if (doc) {
        const data = {
          id: idCustomer,
          name: doc.name,
          cnpj: doc.cnpj,
          contact: doc.contact,
          email: doc.email,
          phone: doc.phone,
          status: doc.status,
        };
        return res.status(200).json({ data });
      } else {
        return res.status(404).json({ errorMessage: "Customer not found" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ errorMessage: err.message });
    });
}

export async function readCustomerToItem(req, res) {
  let customersList = [];

  await CustomerModel.find()
    .where("status")
    .equals(true)
    .sort({ name: "asc" })
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const customer = {
            id: doc._id.toString(),
            name: doc.name,
          };
          customersList.push(customer);
        }
        return res.status(200).json({ data: customersList });
      } else {
        return res
          .status(404)
          .json({ errorMessage: "Customers could not be loaded" });
      }
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
}

export async function updateCustomer(req, res) {
  const { idCustomer, data } = req.body;

  await CustomerModel.findByIdAndUpdate(idCustomer, data)
    .then((response) => {
      if (response) {
        return res.status(200).json({ message: "Customer updated" });
      } else {
        return res.status(404).json({ errorMessage: "Customer not found" });
      }
    })
    .catch((err) => {
      return res.status(404).json({
        errorMessage: err.message,
      });
    });
}

export async function deleteCustomer(req, res) {
  const { idCustomer } = req.body;

  await CustomerModel.findByIdAndDelete(idCustomer)
    .then((response) => {
      if (response) {
        return res.status(200).json({ message: "Customer deleted" });
      } else {
        return res.status(404).json({ errorMessage: "Customer not found" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ errorMessage: err.message });
    });
}
