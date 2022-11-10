import EncapModel from "../model/encap.js";

export async function postEncap(req, res) {
  const data = req.body;

  if (!data) return;

  const encapModel = new EncapModel({
    description: data.description,
  });

  const create = await encapModel.save();
  return res.send(create);
}

export async function getEncapList(req, res) {
  let items = [];

  await EncapModel.find()
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

export async function putEncap(req, res) {}

export async function deleteEncap(req, res) {}
