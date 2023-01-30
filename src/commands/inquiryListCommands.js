export function readInquiryListByHistoryId(doc) {
  const inquiryListItem = {
    idInquiryList: doc._id.toString(),
    idInquiryItem: doc.idInquiryItem._id.toString(),
    inquiryHistory: doc.idInquiryHistory,
    quantity: doc.idInquiryItem.quantity,
    description: doc.idInquiryItem.idItem.description,
    brand: doc.idInquiryItem.idItem.idBrand.description,
    encap: doc.idInquiryItem.idItem.idEncap.description,
    type: doc.idInquiryItem.idItem.idType.description,
    ipi: doc.idInquiryItem.idItem.ipi,
    weight: doc.idInquiryItem.idItem.weight,
    note: doc.idInquiryItem.idItem.note,
    step: doc.idInquiryItem.step,
    prices: [],
  };

  return inquiryListItem;
}

export function readInquiryListByInquiryId(doc, price) {
  const inquiryListItem = {
    idInquiryList: doc._id.toString(),
    idInquiryItem: doc.idInquiryItem._id.toString(),
    inquiryHistory: doc.idInquiryHistory,
    quantity: doc.idInquiryItem.quantity,
    description: doc.idInquiryItem.idItem.description,
    brand: doc.idInquiryItem.idItem.idBrand.description,
    encap: doc.idInquiryItem.idItem.idEncap.description,
    type: doc.idInquiryItem.idItem.idType.description,
    ipi: doc.idInquiryItem.idItem.ipi,
    weight: doc.idInquiryItem.idItem.weight,
    note: doc.idInquiryItem.idItem.note,
    user: doc.idInquiryItem.idUser,
    customer: doc.idInquiryItem.idCustomer,
    step: doc.idInquiryItem.step,
    price: {
      idSupplier: price.idSupplier.toString(),
      name: price.name,
      unitPurchasePrice: price.unitPurchasePriceInCents / 100,
    },
  };

  return inquiryListItem;
}

export function readInquiryListByCompanyCommand(doc) {
  const inquiryListItem = {
    idInquiryList: doc._id.toString(),
    idInquiryItem: doc.idInquiryItem._id.toString(),
    inquiryHistory: doc.idInquiryHistory,
    quantity: doc.idInquiryItem.quantity,
    description: doc.idInquiryItem.idItem.description,
    brand: doc.idInquiryItem.idItem.idBrand.description,
    encap: doc.idInquiryItem.idItem.idEncap.description,
    type: doc.idInquiryItem.idItem.idType.description,
    ipi: doc.idInquiryItem.idItem.ipi,
    weight: doc.idInquiryItem.idItem.weight,
    note: doc.idInquiryItem.idItem.note,
    step: doc.idInquiryItem.step,
    prices: [],
  };

  return inquiryListItem;
}
