export function createInquiryItemCommand(data) {
  const inquiryItem = {
    idItem: data.id,
    description: data.description,
    brand: data.brand,
    type: data.type,
    encap: data.encap,
    ipi: data.ipi,
    weight: data.weight,
    note: data.note,
    step: data.step,
    status: data.status,
    quantity: data.quantity,
    unitPurchasePriceInCents: 0,
    unitSalePriceInCents: 0,
    idUser: data.idUser,
    nameUser: data.nameUser,
    idSupplier: "",
    nameSupplier: "",
    idCustomer: "",
    nameCustomer: "",
  };

  return inquiryItem;
}

export function readInquiryItemCommand(doc) {
  const inquiryItem = {
    id: doc._id,
    idItem: doc.idItem,
    description: doc.description,
    brand: doc.brand,
    type: doc.type,
    encap: doc.encap,
    ipi: doc.ipi,
    weight: doc.weight,
    note: doc.note,
    step: doc.step,
    status: doc.status,
    quantity: doc.quantity,
    unitPurchasePrice: doc.unitPurchasePriceInCents / 100,
    unitSalePrice: doc.unitSalePriceInCents / 100,
    idUser: doc.idUser,
    nameUser: doc.nameUser,
    idCustomer: doc.idCustomer,
    nameCustomer: doc.nameCustomer,
  };

  return inquiryItem;
}

export function updateInquiryItemCommand(data) {
  const inquiryItem = {
    ipi: data.ipi,
    weight: data.weight,
    note: data.note,
    step: data.step,
    status: data.status,
    quantity: data.quantity,
    unitSalePriceInCents: data.unitSalePrice * 100,
    idCustomer: data.idCustomer,
    nameCustomer: data.nameCustomer,
  };

  return inquiryItem;
}

export function updateInquiryItemPriceCommand(data) {
  const inquiryItem = {
    unitPurchasePriceInCents: data.unitPurchasePrice * 100,
    unitSalePriceInCents: data.unitSalePrice * 100,
    idSupplier: data.idSupplier,
    nameSupplier: data.nameSupplier,
  };

  return inquiryItem;
}
