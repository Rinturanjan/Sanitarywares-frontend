import { atom } from "recoil";

const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");
let parsedUser = null;

try {
  parsedUser = storedUser ? JSON.parse(storedUser) : null;
} catch (e) {
  console.error("Invalid user data in localStorage:", e);
  localStorage.removeItem("user");
  parsedUser = null;
}

export const authAtom = atom({
  key: "authAtom",
  default: {
    isLoggedIn: !!storedToken,
    token: storedToken || null, 
    user: parsedUser,
    role: parsedUser?.role || "user",
  },
});
