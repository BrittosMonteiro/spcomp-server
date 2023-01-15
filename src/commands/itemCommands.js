export function readItemCommand(doc) {
  const item = {
    id: doc._id,
    description: doc.description,
    brand: doc.brand,
    type: doc.type,
    encap: doc.encap,
    ipi: doc.ipi,
    weight: doc.weight,
    note: doc.note,
  };

  return item;
}
