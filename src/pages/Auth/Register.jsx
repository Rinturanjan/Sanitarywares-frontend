import { registerUser } from "../../services/authService.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const nav = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const payload = {
      name: f.get("name"),
      number: f.get("number"),
      email: f.get("email"),
      password: f.get("password"),
    };

    try {
      await registerUser(payload);
      nav("/auth/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-bold">Create Account</h1>
      <input name="name" placeholder="Name" className="w-full rounded border p-2" required />
      <input name="number" placeholder="Phone Number" className="w-full rounded border p-2" required />
      <input name="email" placeholder="Email" className="w-full rounded border p-2" required />
      <input name="password" type="password" placeholder="Password" className="w-full rounded border p-2" required />
      <button className="w-full rounded bg-black p-2 text-white">Register</button>
    </form>
  );
}
