export function loginCommand(data) {
  const loginData = {
    username: data.username,
    name: data.name,
    isAdmin: data.isAdmin,
    token: data._id,
    role: data.role,
    id: data._id.toString(),
    isFirstTimeOnline: data.isFirstTimeOnline,
  };

  return loginData;
}
