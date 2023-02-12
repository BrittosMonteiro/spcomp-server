export function createInquiryHistoryCommand(data) {
  let suppliersList = [];
  for (let supplier of data.selectedSuppliers) {
    suppliersList.push(supplier.idSupplier);
  }
  const inquiryHistory = {
    title: data.title,
    suppliersList: suppliersList,
    status: false,
  };

  return inquiryHistory;
}

export function readInquiryHistoryCommand(doc, idSupplier) {
  if (idSupplier) {
    doc.suppliersList = doc.suppliersList.filter(
      (e) => e._id.toString() === idSupplier
    );

    if (!doc.suppliersList.length > 0) {
      return null;
    } else {
    }
  }
  const inquiryHistory = {
    id: doc._id,
    title: doc.title,
    status: doc.status,
  };

  return inquiryHistory;
}

export function updateInquiryHistoryCommand(data) {
  const inquiryHistory = {
    status: data.status,
  };

  return inquiryHistory;
}
