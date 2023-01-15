export function readBrandsCommand(doc) {
  const brand = {
    id: doc._id,
    description: doc.description,
  };

  return brand;
}
