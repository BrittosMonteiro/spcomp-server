import bcrypt from "bcryptjs";

export function createSupplierCommand(data) {
  const supplier = {
    contact: data.contact,
    email: data.email,
    isAdmin: false,
    name: data.name,
    observation: data.observation,
    password: bcrypt.hashSync("teste123", 14),
    role: 4,
    status: data.status,
    username: data.name.toLowerCase().replace(/\s/g, ""),
  };

  return supplier;
}

export function readSuppliersCommand(doc) {
  const supplier = {
    id: doc._id,
    name: doc.name,
    contact: doc.contact,
    email: doc.email,
    status: doc.status,
    observation: doc.observation,
  };

  return supplier;
}

export function readSupplierSimpleCommand(doc) {
  const supplier = {
    idSupplier: doc._id.toString(),
    name: doc.name,
  };

  return supplier;
}
