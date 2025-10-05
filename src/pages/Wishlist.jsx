import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { wishlistAtom } from "../recoil/wishlistAtom";
import { cartAtom } from "../recoil/cartAtom";
import { useEffect, useState } from "react";
import { authAtom } from "../recoil/authAtom";
import { Link, useNavigate } from "react-router-dom";
import { getWishlist, deleteWishlist } from "../services/wishlistService";
import {
  addToCart as addToCartService,
  getCart,
} from "../services/cartService";

import { FaRegCircleXmark } from "react-icons/fa6";

export default function Wishlist() {
  const [wish, setWish] = useRecoilState(wishlistAtom);
  const setCart = useSetRecoilState(cartAtom);
  const auth = useRecoilValue(authAtom);
  const nav = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      nav("/auth/login");
      return;
    }

    (async () => {
      try {
        const serverWish = await getWishlist();

        setWish({
          items: (serverWish.products || []).map((productVariant) => ({
            _id: productVariant._id,
            name: productVariant.name || "Unnamed Product",
            imageUrl: productVariant.imageUrl || "/fallback.png", // simple full URL
            price: productVariant.price || 0,
            size: productVariant.size || null,
          })),
          totalPrice: serverWish.totalAmount || 0,
        });
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      }
    })();
  }, [auth.isLoggedIn, nav, setWish]);

  const removeItem = async (itemId) => {
    try {
      await deleteWishlist(itemId);
      const newItems = wish.items.filter((i) => i._id !== itemId);
      const newTotal = newItems.reduce((sum, item) => sum + item.price, 0);
      setWish({
        items: newItems,
        totalPrice: newTotal,
      });
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  const moveToBag = async (item) => {
    try {
      await addToCartService(item._id, 1);
      const updatedCart = await getCart();
      setCart({
        items: updatedCart.items,
        totalQuantity: updatedCart.items.reduce((a, i) => a + i.quantity, 0),
        totalPrice: updatedCart.totalAmount,
      });

      await deleteWishlist(item._id);
      const newItems = wish.items.filter((i) => i._id !== item._id);
      const newTotal = newItems.reduce((sum, i) => sum + i.price, 0);
      setWish({
        items: newItems,
        totalPrice: newTotal,
      });
    } catch (err) {
      console.error("Failed to move item to bag:", err);
    }
  };

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">Wishlist</h1>

      <div className="mb-4 relative w-64"></div>

      {(wish.items || []).length === 0 ? (
        <p>
          Your Wishlist is Empty.{" "}
          <Link to="/products" className="underline">
            Explore for your LOVE
          </Link>
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-x-3 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {(searchTerm.trim() ? filteredItems : wish.items).map((variant) => (
            <li
              key={variant._id}
              className="flex flex-col justify-between border bg-black"
            >
              <div className="relative gap-4">
                {variant.imageUrl && (
                  <img
                    src={variant.imageUrl || "/fallback.png"}
                    alt={variant.name}
                    className="h-[30vh] w-full md:h-[50vh] lg:h-[70vh] lg:w-[32vw] xl:h-[50vh] xl:w-[25vw] "
                  />
                )}
                <button
                  onClick={() => removeItem(variant._id)}
                  className="absolute text-white bg-black rounded-full md:text-lg lg:text-2xl right-2 top-2"
                >
                  <FaRegCircleXmark />
                </button>
              </div>

              <div className="flex flex-col gap-1 ml-3 mb-4 mt-5 ">
                {/* name */}
                <p className="text-sm font-medium">{variant.name}</p>
                <p className="text-xs font-semibold text-gray-300 ml-1">
                  Size: {variant.size || "-"}
                </p>

                {/* price */}
                <p className="text-xs font-semibold text-gray-300 ml-1">
                  ₹{variant.price}
                </p>
              </div>

              <div className="flex flex-col items-center gap-1 border-t py-4">
                <button
                  onClick={() => moveToBag(variant)}
                  className="bg-black px-3 text-red-600 font-semibold text-[10px] uppercase"
                >
                  Move to Bag
                </button>
                <p className="text-[9px] font-light tracking-wider">
                  Buy now with early access
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
