import {
  readCustomersCommand,
  readCustomerToItemCommand,
} from "../commands/customerCommands.js";
import {
  created,
  errorNotFound,
  errorServiceUnavailable,
  successData,
} from "../handlers/returns.js";
import CustomerModel from "../model/customerModel.js";

export async function createCustomer(req, res) {
  const customer = req.body;

  await new CustomerModel(customer)
    .save()
    .then((response) => {
      if (response) {
        return created(res, "Customer created");
      } else {
        return errorServiceUnavailable(res, "Customer could not be created");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function readCustomers(req, res) {
  let customersList = [];

  await CustomerModel.find()
    .sort({ name: "asc" })
    .then((docs) => {
      if (docs) {
        for (let doc of docs) {
          const customer = readCustomersCommand(doc);
          customersList.push(customer);
        }
        return successData(res, customersList);
      } else {
        return errorServiceUnavailable(res, "Customer could not be loaded");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
    });
}

export async function readCustomerById(req, res) {
  const { idCustomer } = req.params;

  await CustomerModel.findById(idCustomer)
    .then((doc) => {
      if (doc) {
        const customer = readCustomersCommand(doc);
        return successData(res, customer);
      } else {
        return errorServiceUnavailable(res, "Customer could not be loaded");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
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
          const customer = readCustomerToItemCommand(doc);
          customersList.push(customer);
        }
        return successData(res, customersList);
      } else {
        return errorServiceUnavailable(res, "Customer could not be loaded");
      }
    })
    .catch((err) => {
      return errorNotFound(res, err.message);
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
