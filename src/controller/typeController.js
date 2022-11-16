import TypeModel from "../model/type.js";

export async function postType(req, res) {
  const data = req.body;

  if (!data) return;

  const typeModel = new TypeModel({
    description: data.description,
  });

  const create = await typeModel.save();
  return res.send(create);
}

export async function getTypeList(req, res) {
  let items = [];

  await TypeModel.find()
    .then((docs) => {
      for (let doc of docs) {
        const data = {
          id: doc._id,
          description: doc.description,
        };
        items.push(data);
      }
    })
    .catch((err) => {});

  return res.json(items);
}

export async function putType(req, res) {
  const type = req.body;

  const updateType = await TypeModel.findByIdAndUpdate(type.id, {
    description: type.description,
  });

  return res.json(updateType);
}

export async function deleteType(req, res) {
  const { id } = req.body;

  const removeType = await TypeModel.findByIdAndDelete(id);

  return res.json(removeType);
}
