import bcrypt from "bcryptjs";

export function createUserCommnand(data) {
  const user = {
    name: data.name,
    surname: data.surname,
    username: `${data.name.toLowerCase().replace(/\s/g, "")}.${data.surname
      .toLowerCase()
      .replace(/\s/g, "")}`,
    email: `${data.name.toLowerCase().replace(/\s/g, "")}.${data.surname
      .toLowerCase()
      .replace(/\s/g, "")}@spcomponentes.com.br`,
    password: bcrypt.hashSync("teste123", 14),
    status: data.status,
    isAdmin: data.role === 1 || false,
    role: data.role,
  };

  return user;
}

export function readUserCommand(doc) {
  const user = {
    id: doc._id.toString(),
    name: doc.name,
    surname: doc.surname,
    email: doc.email,
    username: doc.username,
    role: doc.role,
    status: doc.status,
    isAdmin: doc.isAdmin,
  };
  return user;
}

export function upateUserCommand(data) {
  const user = {
    name: data.name,
    surname: data.surname,
    username: `${data.name.toLowerCase().replace(/\s/g, "")}.${data.surname
      .toLowerCase()
      .replace(/\s/g, "")}`,
    email: `${data.name.toLowerCase().replace(/\s/g, "")}.${data.surname
      .toLowerCase()
      .replace(/\s/g, "")}@spcomponentes.com.br`,
    status: data.status,
    isAdmin: data.role === 1 || false,
    role: data.role,
  };

  return user;
}
