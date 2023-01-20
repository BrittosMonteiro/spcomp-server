export function createInquiryListCommand(
  idSupplier,
  idInquiryHistory,
  idInquiryItem
) {
  const inquiryList = {
    idInquiryHistory,
    idSupplier,
    idInquiryItem,
    unitPurchasePriceInCents: 0,
  };

  return inquiryList;
}

export function readInquiryListCommand(doc) {
  const inquiryListItem = {
    idInquiryItem: doc.idInquiryItem._id.toString(),
    quantity: doc.idInquiryItem.quantity,
    description: doc.idInquiryItem.idItem.description,
    brand: doc.idInquiryItem.idItem.idBrand.description,
    encap: doc.idInquiryItem.idItem.idEncap.description,
    type: doc.idInquiryItem.idItem.idType.description,
    ipi: doc.idInquiryItem.ipi,
    weight: doc.idInquiryItem.weight,
    note: doc.idInquiryItem.note,
    createdAt: doc.idInquiryItem.createdAt,
    user: doc.idInquiryItem.idUser.username,
    unitPurchasePrice: doc.unitPurchasePriceInCents / 100,
    idInquiryList: doc._id.toString(),
  };
  return inquiryListItem;
}

export function readSingleItemFromInquiryListCommand(doc, idInquiryItem) {
  const inquiryList = {
    idInquiryList: doc._id.toString(),
    idInquiryHistory: doc.idInquiryHistory,
    idSupplier: doc.idSupplier,
    nameSupplier: doc.nameSupplier,
    item: filterItems(doc, idInquiryItem),
  };

  return inquiryList;
}

function filterItems(doc, idInquiryItem) {
  const newList = doc.items.filter(
    (item) => item.idInquiryItem === idInquiryItem
  );

  return newList;
}
