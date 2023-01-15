export function readCustomersCommand(doc) {
  const customer = {
    id: doc._id.toString(),
    name: doc.name,
    cnpj: doc.cnpj,
    contact: doc.contact,
    email: doc.email,
    phone: doc.phone,
    status: doc.status,
  };

  return customer;
}

export function readCustomerToItemCommand(doc) {
  const customer = {
    id: doc._id.toString(),
    name: doc.name,
  };

  return customer;
}
