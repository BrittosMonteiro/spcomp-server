export function createInquiryListCommand(doc, idInquiryHistory, items) {
  const inquiryList = {
    idInquiryHistory: idInquiryHistory,
    idSupplier: doc._id.toString(),
    nameSupplier: doc.name,
    items: items,
  };

  return inquiryList;
}

export function readInquiryListCommand(doc, idInquiryHistory) {
  const inquiryList = {
    idInquiryList: doc._id.toString(),
    idInquiryHistory,
    idSupplier: doc.idSupplier,
    nameSupplier: doc.nameSupplier,
    items: doc.items,
  };

  return inquiryList;
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
