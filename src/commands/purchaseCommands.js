export function createPurchaseCommand(data) {
  const purchaseItem = {
    idInquiryItem: data.idInquiryItem,
    idUser: data.idUser,
    idCustomer: data.idCustomer,
    idSupplier: data.idSupplier || "63bb4281be12d1c31b2ca5e1",
  };

  return purchaseItem;
}

export function readPurchase(doc) {
  const purchaseItem = {
    id: doc._id,
    idInquiry: doc.id,
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
  };

  return purchaseItem;
}
