export function loginCommand(data) {
  const loginData = {
    username: data.username,
    isAdmin: data.isAdmin,
    token: data._id,
    role: data.role,
  };

  return loginCommand;
}
