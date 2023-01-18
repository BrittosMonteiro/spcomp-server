export function createItemCommand(data) {
  const item = {
    description: data.description,
    idBrand: data.idBrand,
    idType: data.idType,
    idEncap: data.idEncap,
    ipi: data.ipi,
    weight: data.weight,
    note: data.note,
  };

  return item;
}

export function readItemCommand(doc) {
  const item = {
    item: {
      id: doc._id.toString(),
      description: doc.description,
      brand: {
        id: doc.idBrand._id.toString(),
        description: doc.idBrand.description,
      },
      type: {
        id: doc.idType._id.toString(),
        description: doc.idType.description,
      },
      encap: {
        id: doc.idEncap._id.toString(),
        description: doc.idEncap.description,
      },
      ipi: doc.ipi,
      weight: doc.weight,
      note: doc.note,
    },
  };

  return item;
}
