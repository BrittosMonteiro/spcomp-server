import UserModel from "../model/userModel.js";

export async function createUser(req, res) {
  const { name, surname, status, role } = req.body;

  const userModel = new UserModel({
    name: name,
    surname: surname,
    username: `${name.toLowerCase()}.${surname.toLowerCase()}`,
    email: `${name.toLowerCase()}.${surname.toLowerCase()}@spcomponentes.com.br`,
    password: "teste123",
    status: status,
    isAdmin: role === 1 || false,
    role: role,
  });

  const create = await userModel.save();

  return res.json(create);
}

export async function getUsersList(req, res) {
  let usersList = [];

  await UserModel.find()
    .sort({ name: "asc" })
    .then((docs) => {
      for (let doc of docs) {
        const user = {
          name: doc.name,
          surname: doc.surname,
          username: doc.username,
          email: doc.email,
          status: doc.status,
          isAdmin: doc.isAdmin,
          id: doc._id.toString(),
          role: doc.role,
        };
        usersList.push(user);
      }
    });

  return res.json(usersList);
}

export async function getUserById(req, res) {
  const { id } = req.body;

  const user = await UserModel.findById(id);

  return res.json(user);
}

export async function updateUser(req, res) {
  const data = req.body;

  const update = await UserModel.findByIdAndUpdate(data.id, {
    name: data.name,
    surname: data.surname,
    username: `${data.name.toLowerCase()}.${data.surname.toLowerCase()}`,
    email: data.email,
    password: data.password,
    status: data.status,
    isAdmin: data.isAdmin,
  });

  return res.json(update);
}

export async function removeUser(req, res) {
  const { id } = req.body;

  const removeUser = await UserModel.findByIdAndDelete(id);

  return res.send(removeUser);
}
