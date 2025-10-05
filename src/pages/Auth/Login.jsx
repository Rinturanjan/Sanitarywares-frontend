import { useSetRecoilState } from "recoil";
import { authAtom } from "../../recoil/authAtom";
import { cartAtom } from "../../recoil/cartAtom.js";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../services/cartService.js";

export default function Login() {
  const setAuth = useSetRecoilState(authAtom);
  const setCart = useSetRecoilState(cartAtom);
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await login({
      email: form.get("email"),
      password: form.get("password"),
    });

    console.log("User after login:", res);

    localStorage.setItem("token", res.token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: res._id,
        name: res.name,
        number: res.number,
        email: res.email,
        role: res.role,
      })
    );

    setAuth({
      isLoggedIn: true,
      token: res.token,
      user: {
        _id: res._id,
        name: res.name,
        number: res.number,
        email: res.email,
        role: res.role,
      },
      role: res.role || "user",
    });

    // Fetch cart only if login is successful
    try {
      const cartData = await getCart();
      setCart({
        items: cartData.items,
        totalQuantity: cartData.items.reduce((a, i) => a + i.quantity, 0),
        totalPrice: cartData.totalAmount,
      });
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCart({ items: [], totalQuantity: 0, totalPrice: 0 });
    }

    nav(res.user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user");
  };

  return (
    <form onSubmit={handleLogin} className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <input
        name="email"
        placeholder="Email"
        className="w-full rounded border p-2"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full rounded border p-2"
        required
      />
      <button className="w-full rounded bg-black p-2 text-white">
        Sign In
      </button>
    </form>
  );
}
