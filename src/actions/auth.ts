export async function loginAction(email: string, password: string) {
    const user = {
    id: "1".toString(),
    name: "John Doe",
    email,
  };

  // Random token
  const token = Math.random().toString(36).substring(2);

  return {
    user,
    token,
  };
}
