import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartAtom } from "../recoil/cartAtom.js";
import { authAtom } from "../recoil/authAtom.js";
import { Link, useNavigate } from "react-router-dom";
import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "../services/cartService.js";

export default function Cart() {
  const [cart, setCart] = useRecoilState(cartAtom);
  const auth = useRecoilValue(authAtom);
  const nav = useNavigate();

  // Fetch cart on mount
  useEffect(() => {
    if (!auth.isLoggedIn) {
      nav("/auth/login");
      return;
    }
    (async () => {
      try {
        const serverCart = await getCart();
        setCart({
          items: serverCart.items,
          totalQuantity: serverCart.items.reduce((a, i) => a + i.quantity, 0),
          totalPrice: serverCart.totalAmount,
        });
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    })();
  }, [auth.isLoggedIn, nav, setCart]);

  // removeItem
  const handleRemoveItem = async (cartItemId, productId) => {
    try {
      await removeCartItem(productId);
      const updatedItems = cart.items.filter((i) => i._id !== cartItemId);
      const totalQuantity = updatedItems.reduce((a, i) => a + i.quantity, 0);
      const totalPrice = updatedItems.reduce(
        (a, i) => a + i.price * i.quantity,
        0
      );
      setCart({
        items: updatedItems,
        totalQuantity,
        totalPrice,
      });
      localStorage.setItem(
        "cart",
        JSON.stringify({
          items: updatedItems,
          totalQuantity,
          totalPrice,
        })
      );
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  // Update quantity locally and backend
  const updateQty = async (cartItemId, delta) => {
    const item = cart.items.find((i) => i._id === cartItemId);
    if (!item) return;

    const newQty = item.quantity + delta;

    try {
      if (newQty <= 0) {
        // Remove the item if newQty is 0 or less
        await removeCartItem(item.productId);

        const updatedItems = cart.items.filter((i) => i._id !== cartItemId);
        const totalQuantity = updatedItems.reduce((a, i) => a + i.quantity, 0);
        const totalPrice = updatedItems.reduce(
          (a, i) => a + i.price * i.quantity,
          0
        );

        setCart({
          ...cart,
          items: updatedItems,
          totalQuantity,
          totalPrice,
        });
        localStorage.setItem(
          "cart",
          JSON.stringify({
            items: updatedItems,
            totalQuantity,
            totalPrice,
          })
        );
      } else {
        // Update the quantity normally
        await updateCartItem(item.productId, newQty);

        const items = cart.items.map((i) =>
          i._id === cartItemId ? { ...i, quantity: newQty } : i
        );
        const totalQuantity = items.reduce((a, i) => a + i.quantity, 0);
        const totalPrice = items.reduce((a, i) => a + i.price * i.quantity, 0);

        setCart({
          ...cart,
          items,
          totalQuantity,
          totalPrice,
        });
        // localStorage.setItem("cart", JSON.stringify({
        //   items,
        //   totalQuantity,
        //   totalPrice,
        // }));
      }
    } catch (err) {
      console.error("Failed to update or remove item:", err);
    }
  };

  return (
    <section className="tracking-widest font-bold text-sm flex flex-col gap-5">
      <div className="flex gap-2">
        <span className="uppercase text-gray-300">
          {cart.totalQuantity} items selected
        </span>
        <span className="text-red-600 font-semibold">
          (₹{cart.totalPrice})
        </span>
      </div>
      {/* <h1 className="mb-4 text-2xl font-bold">Your Bag</h1> */}
      {cart.items.length === 0 ? (
        <p>
          No items.{" "}
          <Link to="/products" className="underline">
            Shop now
          </Link>
        </p>
      ) : (
        <>
          <ul className="flex flex-col gap-4">
            {cart.items.map((i) => (
              <li
                key={i._id}
                className="flex items-center gap-1 py-3 md:h-36 w-full md:w-[50vw] border rounded-lg p-2 backdrop-blur-3xl"
              >
                {/* image */}
                <img
                  src={i.imageUrl}
                  alt={i.name}
                  className="h-24 md:h-32 w-20 md:w-24 object-cover rounded"
                />

                <div className="w-full md:flex md:flex-col md:gap-3.5">

                  {/* comapnyName, productName, description */}
                  <div className="flex flex-col gap-1 md:gap-1.5">
                    {i.company?.name && (
                      <span className="text-xs text-white">
                        {i.company.name}
                      </span>
                    )}
                    <span className="font-extralight tracking-wide text-xs">
                      {i.name}
                    </span>
                    {i.description && (
                      <p className="text-[8px] text-gray-300 font-semibold">{i.description}</p>
                    )}
                  </div>

                  {/* size & Qty */}
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs text-gray-300 font-extralight bg-red-600 rounded p-0.5">
                      {i.size?.value ?? "One Size"}
                    </span>

                    <div className="flex gap-1">
                      <button
                        onClick={() => updateQty(i._id, -1)}
                        className="rounded border px-2 text-xs"
                      >
                        -
                      </button>

                      <span className="text-xs">{i.quantity}</span>
                      <button
                        onClick={() => updateQty(i._id, 1)}
                        className="rounded border px-2 text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* price */}
                  <span className="text-xs">₹ {Number(i.price) * Number(i.quantity)}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* totalPrice, placeOrderBtn */}
          <div className="mt-4 flex flex-col items-center justify-between">
            <span className="font-semibold">
              Total: <b>₹{cart.totalPrice}</b>
            </span>
            <Link
              to="/checkout"
              className="rounded-lg bg-red-600 px-4 py-2 text-white uppercase tracking-widest text-xs font-semibold"
            >
              Place Order
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
