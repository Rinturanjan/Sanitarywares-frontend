import { useEffect } from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { productAtom } from "../recoil/productAtom";
import { cartAtom } from "../recoil/cartAtom";
import { wishlistAtom } from "../recoil/wishlistAtom";
import { authAtom } from "../recoil/authAtom";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import {
  addToCart as addToCartService,
  getCart,
} from "../services/cartService";
import {
  addToWishlist as addToWishlistService,
  getWishlist,
} from "../services/wishlistService.js";

export default function Products() {
  const [state, setState] = useRecoilState(productAtom);
  const setCart = useSetRecoilState(cartAtom);
  const setWishlist = useSetRecoilState(wishlistAtom);
  const auth = useRecoilValue(authAtom);
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const searchTerm = searchParams.get("search") || "";
  const categoryId = searchParams.get("category") || "";

  // Retrieve the category name from location state
  const categoryName = location.state?.categoryName || "";
  const companyName = searchParams.get("company") || "";

  useEffect(() => {
    (async () => {
      setState((s) => ({ ...s, loading: true }));
      try {
        const list = await getProducts({
          q: searchTerm,
          category: categoryId, // filter by category ID
          company: companyName,
          sort: state.sortOption,
        });
        setState((s) => ({ ...s, products: list, loading: false }));
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setState((s) => ({ ...s, loading: false }));
      }
    })();
  }, [searchTerm, categoryId]);

  const addToCart = async (product, variantId) => {
    if (!auth.isLoggedIn) return nav("/auth/login");
    if (!variantId) return alert("Please select a size");

    await addToCartService(variantId, 1);
    const updatedCart = await getCart();
    setCart({
      items: updatedCart.items,
      totalQuantity: updatedCart.items.reduce((a, i) => a + i.quantity, 0),
      totalPrice: updatedCart.totalAmount,
    });
  };

  const addToWishlist = async (product, variantId) => {
    if (!auth.isLoggedIn) return nav("/auth/login");
    if (!variantId) return alert("Please select a size");

    await addToWishlistService(variantId, 1);
    const updatedWishlist = await getWishlist();
    setWishlist({
      items: updatedWishlist.items,
      totalPrice: updatedWishlist.totalAmount,
    });
  };

  if (state.loading) return <Loader />;

  return (
    <section>
      {/* banner */}
      <div className="border w-full flex flex-col justify-center items-center">
        <span>Banner</span>
        <h1 className="uppercase md:text-lg">litu sanitary house</h1>
        <span>Banner</span>
      </div>

      <h1 className="mb-4 text-xs md:text-lg font-semibold uppercase tracking-widest ml-1">
        smart sanitary picks {categoryName && `- ${categoryName}`} {companyName && ` - ${companyName}`}
      </h1>
      <div className="grid grid-cols-2 gap-y-4 xl:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {state.products.length === 0 ? (
          <p>No products found for this category.</p>
        ) : (
          state.products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              categoryName={p.categoryName}
              companyName={
                p.variants.length > 0
                  ? p.variants[0]?.company?.name || "N/A"
                  : "N/A"
              }
              onAdd={(product, variantId) => addToCart(product, variantId)}
              onWishlist={(product, variantId) =>
                addToWishlist(product, variantId)
              }
            />
          ))
        )}
      </div>
    </section>
  );
}
