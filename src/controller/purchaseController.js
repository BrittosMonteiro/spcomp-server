import { createPurchaseCommand } from "../commands/purchaseCommands.js";
import PurchaseItemModel from "../model/purchaseModel.js";

export async function createPurchase(req, res) {
  const data = req.body;
  const purchaseItem = createPurchaseCommand(data);

  await new PurchaseItemModel(purchaseItem)
    .save()
    .then((response) => {
      if (response) {
        console.log(response);
        return;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function readPurchase(req, res) {
  let items = [];

  await PurchaseItemModel.find()
    .populate({ path: "idInquiryItem" })
    .populate({ path: "idUser", select: "_id, username" })
    .populate({ path: "idCustomer", select: "_id, name" })
    .populate({ path: "idSupplier", select: "_id, name" })
    .then((docs) => {
      if (docs) {
        // for (let doc of docs) {
        //   const data = {};
        //   items.unshift(data);
        // }
        return res.json(docs);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function readSinglePurchase(req, res) {}

export async function updatePurchase(req, res) {
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

export async function deletePurchase(req, res) {
  const { id } = req.body;

  const remove = await PurchaseItemModel.findByIdAndDelete(id);

  return res.send(remove);
}
