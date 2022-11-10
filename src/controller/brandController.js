import BrandModel from "../model/brand.js";

export async function postBrand(req, res) {
  const data = req.body;

  if (!data) return;

  const brandModel = new BrandModel({
    description: data.description,
  });

  const create = await brandModel.save();
  return res.send(create);
}

export async function getBrandList(req, res) {
  let items = [];

  await BrandModel.find()
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

export async function putBrand(req, res) {}

export async function deleteBrand(req, res) {}
