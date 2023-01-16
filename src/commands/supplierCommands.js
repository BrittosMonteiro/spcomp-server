export function createSupplierCommand(data) {
  const supplier = {
    name: data.supplierName,
    contact: data.contactName,
    email: data.email,
    status: data.status,
    observation: data.observation,
    password: data.password,
    role: 4,
    isAdmin: false,
    username: data.username,
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