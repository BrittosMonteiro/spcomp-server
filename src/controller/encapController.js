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

export async function putEncap(req, res) {
  const encap = req.body;

  const updateEncap = await EncapModel.findByIdAndUpdate(encap.id, {
    description: encap.description,
  });

  return res.json(updateEncap);
}

export async function deleteEncap(req, res) {
  const { id } = req.body;

  const removeEncap = await EncapModel.findByIdAndDelete(id);

  return res.json(removeEncap);
}
