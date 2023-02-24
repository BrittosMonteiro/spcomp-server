export function loginCommand(data) {
  const loginData = {
    username: data.username,
    name: data.name,
    isAdmin: data.isAdmin,
    token: data._id,
    role: data.role,
  };

  return loginData;
}
