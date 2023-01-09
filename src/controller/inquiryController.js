import InquiryModel from "../model/InquiryModel.js";
import SupplierModel from "../model/supplierModel.js";
import SupplierInquiryModel from "../model/supplierInquiry.js";

export async function addItemToInquiryList(req, res) {
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

export async function getAllItemsFromInquiryList(req, res) {
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

export async function updateItemInInquiryList(req, res) {
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

export async function deleteItemFromInquiryList(req, res) {
  const { id } = req.body;

  const remove = await InquiryModel.findByIdAndDelete(id);
  return res.send(remove);
}

export async function updateItemStatus(req, res) {}
export async function deleteAllItemsFromInquiryList(req, res) {}

export async function setInquiryList(req, res) {
  const data = req.body;

  return res.json(data);
}

export async function getInquiryList(req, res) {
  const { idCompany } = req.body;
  let inquiries = [];
  let companyItems = [];

  const newLists = await SupplierInquiryModel.find()
    .where("status")
    .equals(true);

  for (let list of newLists) {
    const data = {
      id: list._id,
      title: list.title,
      items: [],
    };

    const filteredList = list.suppliers.filter(
      (supplier) => supplier.idCompany === idCompany
    );

    for (let list of filteredList) {
      data.items = list.items;
    }
    inquiries.push(data);
  }

  return res.json(inquiries);
}

export async function updateInquiryList(req, res) {
  const data = req.body;
  let inquiryList = [];

  inquiryList = await SupplierInquiryModel.findById(data.inquiryId);
  let newList = inquiryList.suppliers.filter(
    (supplier) => supplier.idCompany === data.supplierId
  );

  let item = newList.items;

  console.log(item);
}
