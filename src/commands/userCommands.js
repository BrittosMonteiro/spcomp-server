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
    isAdmin: isUserAdmin(data.role),
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

export function readUserByIdCommand(doc) {
  const user = {
    name: doc.name,
    surname: doc.surname,
    email: doc.email,
    username: doc.username,
  };
  return user;
}

export function updateUserCommand(data) {
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
    role: data.role,
    isAdmin: isUserAdmin(data.role),
  };

  return user;
}

function isUserAdmin(role) {
  if (role === 1 || role === "1") {
    return true;
  }

  return false;
}
