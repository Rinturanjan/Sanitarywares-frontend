import api from "./api";
import { cartAtom } from "../recoil/cartAtom.js"

export async function login(payload) {
  const { data } = await api.post("/auth/login", payload);
  localStorage.setItem("token", data.token);
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  } else {
    localStorage.removeItem("user");
  }

  return data; // { token, user }
}

export async function registerUser(payload) {
  try {
    const { data } = await api.post("/auth/signup", payload);

    console.log("Login API response:", data); 
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMe() {
  const { data } = await api.get("/auth/me");
  return data;
}

export function logout(setAuth) {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setAuth({
    isLoggedIn: false,
    token: null,
    user: null,
    role: "user",
  });
  // setCart({ items: [], totalAmount: 0, totalPrice: 0 });
}
