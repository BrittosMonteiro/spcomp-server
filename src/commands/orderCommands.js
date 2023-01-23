export function createOrderCommand(data) {
  const orderItem = {
    idInquiryItem: data.idInquiryItem,
    idUser: data.idUser,
    idCustomer: data.idCustomer,
    idSupplier: data.idSupplier || "63bb4281be12d1c31b2ca5e1",
  };

  return orderItem;
}

export function readOrderCommand(doc) {
  const orderItem = {
    idOrder: doc._id.toString(),
    item: {
      idInquiry: doc.idInquiryItem._id.toString(),
      description: doc.idInquiryItem.idItem.description,
      brand: doc.idInquiryItem.idItem.idBrand.description,
      type: doc.idInquiryItem.idItem.idType.description,
      encap: doc.idInquiryItem.idItem.idEncap.description,
      ipi: doc.idInquiryItem.idItem.ipi,
      weight: doc.idInquiryItem.idItem.weight,
      note: doc.idInquiryItem.idItem.note,
      step: doc.idInquiryItem.step,
      quantity: doc.idInquiryItem.quantity,
      unitPurchasePrice: doc.idInquiryItem.unitPurchasePriceInCents / 100,
      unitSalePrice: doc.idInquiryItem.unitSalePriceInCents / 100,
    },
    customer: {
      name: doc.idInquiryItem.idCustomer.name,
    },
    supplier: {
      name: doc.idInquiryItem.idSupplier.name,
    },
    user: {
      username: doc.idInquiryItem.idUser.username,
    },
  };

  return orderItem;
}
