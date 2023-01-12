import ItemModel from "../model/ItemModel.js";

export async function createItem(req, res) {
  const data = req.body;

  let itemModel = new ItemModel({
    description: data.description,
    brand: data.brand,
    type: data.type,
    encap: data.encap,
    ipi: data.ipi,
    weight: data.weight,
    note: data.note,
  });

  const create = await itemModel.save();
  return res.send(create);
}

export async function getAllItems(req, res) {
  let items = [];
  await ItemModel.find()
    .then((res) => {
      for (let r of res) {
        const data = {
          id: r._id,
          description: r.description,
          brand: r.brand,
          type: r.type,
          encap: r.encap,
          ipi: r.ipi,
          weight: r.weight,
          note: r.note,
        };
        items.unshift(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return res.json(items);
}

export async function updateItem(req, res) {
  const data = req.body;

  const update = await ItemModel.findByIdAndUpdate(data.id, {
    description: data.description,
    brand: data.brand,
    type: data.type,
    encap: data.encap,
    ipi: data.ipi,
    weight: data.weight,
    note: data.note,
  });

  return res.send(update);
}

export async function deleteItem(req, res) {
  const idItem = req.body.id;
  const remove = await ItemModel.findByIdAndDelete(idItem);
  return res.send(remove);
}
