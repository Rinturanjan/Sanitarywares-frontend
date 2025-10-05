import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../../recoil/authAtom.js";
import { cartAtom } from "../../recoil/cartAtom.js";
import { getCart } from "../../services/cartService.js";

export default function InitializeAuth() {
  const setAuth = useSetRecoilState(authAtom);
  const setCart = useSetRecoilState(cartAtom);

  useEffect(() => {
    const initialize = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (token && user) {
        setAuth({
          isLoggedIn: true,
          token,
          user,
          role: user.role || "user",
        });

        // Fetch and set the cart from the backend
        try {
          const cartData = await getCart();
          const items = cartData.items || [];
          setCart({
            items,
            totalQuantity: items.reduce((a, i) => a + i.quantity, 0),
            totalPrice: items.reduce((a, i) => a + i.price * i.quantity, 0),
          });
        } catch (error) {
          console.error("Failed to load cart:", error);
          setCart({
            items: [],
            totalQuantity: 0,
            totalPrice: 0,
          });
        }
      }
    };

    initialize();
  }, [setAuth, setCart]);

  return null;
}
