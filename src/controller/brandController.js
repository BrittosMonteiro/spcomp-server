import BrandModel from "../model/brandModel.js";

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

export async function putBrand(req, res) {
  const brand = req.body;

  const updateBrand = await BrandModel.findByIdAndUpdate(brand.id, {
    description: brand.description,
  });

  return res.json(updateBrand);
}

export async function deleteBrand(req, res) {
  const { id } = req.body;

  const removeBrand = await BrandModel.findByIdAndDelete(id);

  return res.json(removeBrand);
}
