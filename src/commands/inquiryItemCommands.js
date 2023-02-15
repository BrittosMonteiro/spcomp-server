export function createInquiryItemCommand(data) {
  const inquiryItem = {
    idItem: data.idItem,
    idUser: data.idUser,
    quantity: 0,
    unitPurchasePriceInCents: 0,
    unitSalePriceInCents: 0,
    leadtime: data.leadtime,
    datacode: data.datacode,
    condition: data.condition,
  };

  return inquiryItem;
}

export function readInquiryItemCommand(doc) {
  const inquiryItem = {
    item: {
      idInquiryItem: doc._id.toString(),
      item: {
        id: doc.idItem._id.toString(),
        description: doc.idItem.description,
        brand: {
          id: doc.idItem.idBrand._id.toString(),
          description: doc.idItem.idBrand.description,
        },
        encap: {
          id: doc.idItem.idEncap._id.toString(),
          description: doc.idItem.idEncap.description,
        },
        type: {
          id: doc.idItem.idType._id.toString(),
          description: doc.idItem.idType.description,
        },
        weight: doc.idItem.weight,
        ipi: doc.idItem.ipi,
        note: doc.idItem.note,
        quantity: doc.quantity,
        step: doc.step,
        unitPurchasePrice: doc.unitPurchasePriceInCents / 100,
        unitSalePrice: doc.unitSalePriceInCents / 100,
      },
      user: {
        id: doc.idUser._id.toString(),
        username: doc.idUser.username,
      },
      customer: {
        id: doc.idCustomer ? doc.idCustomer._id.toString() : "",
        name: doc.idCustomer ? doc.idCustomer.name : "",
      },
      supplier: {
        id: doc.idSupplier ? doc.idSupplier._id.toString() : "",
        name: doc.idSupplier ? doc.idSupplier.name : "",
      },
      createdAt: new Date(doc.createdAt).toLocaleDateString(),
      daysLeft: daysLeft(doc.createdAt),
    },
  };

  return inquiryItem;
}

export function updateInquiryItemCommand(data) {
  const inquiryItem = {
    idCustomer: data.idCustomer,
    quantity: data.quantity,
    unitSalePriceInCents: data.unitSalePrice ? data.unitSalePrice * 100 : 0,
    ipi: data.ipi,
    weight: data.weight,
    note: data.note,
    step: data.step,
  };

  return inquiryItem;
}

export function updateInquiryItemPriceCommand(data) {
  const inquiryItem = {
    unitPurchasePriceInCents: data.unitPurchasePrice * 100,
    unitSalePriceInCents: data.unitSalePrice * 100,
    idSupplier: data.idSupplier,
    leadtime: data.leadtime,
    datacode: data.datacode,
    condition: data.condition,
  };

  return inquiryItem;
}

function daysLeft(createdAt) {
  const today = new Date().toISOString().split("T")[0];
  const created = new Date(createdAt).toISOString().split("T")[0];
  const difference = new Date(today) - new Date(created);
  if (difference > 0) {
    return difference / (1000 * 60 * 60 * 24);
  }
  return difference;
}
