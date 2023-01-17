export function createInquiryItemCommand(data) {
  const inquiryItem = {
    idItem: data.idItem,
    idUser: data.idUser,
    idSupplier: data.idSupplier,
    idCustomer: data.idCustomer,
    quantity: data.quantity || 0,
    unitPurchasePriceInCents: data.unitPurchasePrice || 0,
    unitSalePriceInCents: data.unitSalePrice || 0,
  };

  return inquiryItem;
}

export function readInquiryItemCommand(doc) {
  const inquiryItem = {
    item: {
      id: doc.idItem._id.toString(),
      description: doc.idItem.description,
      brand: doc.idItem.brand,
      type: doc.idItem.type,
      encap: doc.idItem.encap,
      // brand: {
      //   id: doc.idItem.idBrand._id.toString(),
      //   description: doc.idItem.idBrand.description,
      // },
      // type: {
      //   id: doc.idItem.idType._id.toString(),
      //   description: doc.idItem.idType.description,
      // },
      // encap: {
      //   id: doc.idItem.idEncap._id.toString(),
      //   description: doc.idItem.idEncap.description,
      // },
      ipi: doc.idItem.ipi,
      weight: doc.idItem.weight,
      note: doc.idItem.note,
      quantity: doc.idItem.quantity,
      unitPurchasePrice: doc.idItem.unitPurchasePriceInCents / 100,
      unitSalePrice: doc.idItem.unitSalePriceInCents / 100,
    },
    user: {
      id: doc.idUser._id.toString(),
      name: doc.idUser.name,
    },
    customer: {
      id: doc.idCustomer._id.toString(),
      name: doc.idCustomer.name,
    },
    supplier: {
      id: doc.idSupplier._id.toString(),
      name: doc.idSupplier.name,
    },
    createdAt: new Date(doc.createdAt).toLocaleDateString(),
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
