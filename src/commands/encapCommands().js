export function readEncapCommand(doc) {
  const encap = {
    id: doc._id,
    description: doc.description,
  };

  return encap;
}
