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

export async function putType(req, res) {}

export async function deleteType(req, res) {}
