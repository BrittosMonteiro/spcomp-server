import StockModel from "../model/stockModel.js";

export async function postStockItem(req, res) {
  const data = req.body;

  const stockModel = new StockModel({
    idItem: data.idItem,
    idInquiry: data.idInquiry,
    idPurchase: data.id,
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

  const create = await stockModel.save();

  return res.send(create);
}

export async function getStockItemList(req, res) {
  let items = [];

  await StockModel.find()
    .then((docs) => {
      for (let doc of docs) {
        const data = {
          id: doc._id,
          idItem: doc.idItem,
          idInquiry: doc.idInquiry,
          idPurchase: doc.idPurchase,
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
      console.log(err);
    });

  return res.json(items);
}

export async function putStockItem(req, res) {}

export async function deleteStockItem(req, res) {
  const { id } = req.body;

  const remove = await StockModel.findByIdAndDelete(id);

  return res.send(remove);
}
