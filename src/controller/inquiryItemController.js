import InquiryModel from "../model/InquiryItemModel.js";

export async function createInquiryItem(req, res) {
  const data = req.body;

  if (data.unitPriceInCents) {
    data.unitPriceInCents = data.unitPriceInCents * 100;
  }

  const inquiryModel = new InquiryModel({
    idItem: data.id,
    description: data.description,
    brand: data.brand,
    type: data.type,
    encap: data.encap,
    ipi: data.ipi,
    weight: data.weight,
    note: data.note,
    step: data.step,
    status: data.status,
    quantity: data.quantity,
    unitPurchasePriceInCents: data.unitPurchasePrice * 100,
    unitSalePriceInCents: data.unitSalePrice * 100,
  });

  const create = await inquiryModel.save();
  return res.send(create);
}

export async function readInquiryItems(req, res) {
  let items = [];

  await InquiryModel.find()
    .then((docs) => {
      for (let doc of docs) {
        const data = {
          id: doc._id,
          idItem: doc.idItem,
          description: doc.description,
          brand: doc.brand,
          type: doc.type,
          encap: doc.encap,
          ipi: doc.ipi,
          weight: doc.weight,
          note: doc.note,
          step: doc.step,
          status: doc.status,
          quantity: doc.quantity,
          unitPurchasePrice: doc.unitPurchasePriceInCents / 100,
          unitSalePrice: doc.unitSalePriceInCents / 100,
        };
        items.push(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return res.json(items);
}

export async function updateInquiryItem(req, res) {
  const data = req.body;

  const update = await InquiryModel.findByIdAndUpdate(data.id, {
    id: data.id,
    description: data.description,
    brand: data.brand,
    type: data.type,
    encap: data.encap,
    ipi: data.ipi,
    weight: data.weight,
    note: data.note,
    step: data.step,
    status: data.status,
    quantity: data.quantity,
    unitPurchasePriceInCents: data.unitPurchasePrice * 100,
    unitSalePriceInCents: data.unitSalePrice * 100,
  });
  return res.send(update);
}

export async function updateInquiryItemPrice(req, res) {
  const { idInquiryItem, unitSalePrice } = req.body;

  await InquiryModel.findByIdAndUpdate(idInquiryItem, {
    unitSalePriceInCents: unitSalePrice * 100,
  })
    .then(() => {
      return res.json({ status: 200 });
    })
    .catch(() => {
      return res.json({ status: 404 });
    });

  return;
}

export async function deleteInquiryItem(req, res) {
  const { id } = req.body;

  const remove = await InquiryModel.findByIdAndDelete(id);
  return res.send(remove);
}
