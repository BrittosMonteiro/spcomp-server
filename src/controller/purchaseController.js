import PurchaseItemModel from "../model/purchaseModel.js";

export async function addItemToPurchaseList(req, res) {
  const data = req.body;

  if (data.unitPrice) {
    data.unitPriceInCents = data.unitPrice * 100;
  }

  const purchaseItemModel = new PurchaseItemModel({
    idInquiry: data.id,
    idItem: data.idItem,
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

  const create = await purchaseItemModel.save();
  return res.send(create);
}

export async function getPurchaseList(req, res) {
  let items = [];

  await PurchaseItemModel.find()
    .then((docs) => {
      for (let doc of docs) {
        const data = {
          id: doc._id,
          idInquiry: doc.id,
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
        items.unshift(data);
      }
    })
    .catch((err) => {
      conosole.log(err);
    });
  return res.json(items);
}

export async function updateItemFromPurchaseList(req, res) {
  const data = req.body;

  const updateItem = await PurchaseItemModel.findByIdAndUpdate(data.id, {
    idInquiry: data.id,
    idItem: data.idItem,
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
}

export async function deleteItemFromPurchaseList(req, res) {
  const { id } = req.body;

  const remove = await PurchaseItemModel.findByIdAndDelete(id);

  return res.send(remove);
}
