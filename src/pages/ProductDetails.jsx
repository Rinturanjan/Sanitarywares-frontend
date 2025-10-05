import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import Loader from "../components/Loader";
import { useSetRecoilState } from "recoil";
import { cartAtom } from "../recoil/cartAtom";
import { addToCart as addToCartService } from "../services/cartService";
import { HiMiniShoppingBag } from "react-icons/hi2";

export default function ProductDetails() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const setCart = useSetRecoilState(cartAtom);

  // ✅ New state for variants
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    (async () => {
      const product = await getProductById(id);

      // Fix imageUrl
      let imageUrl = "/fallback.png"; // default fallback
      if (product.imageUrl) {
        const rawUrl = product.imageUrl;
        if (/^https?:\/\//i.test(rawUrl)) {
          imageUrl = rawUrl;
        } else {
          // Remove /api from VITE_API_URL for images
          const baseUrl = (
            import.meta.env.VITE_API_URL || "http://localhost:5000"
          )
            .replace(/\/api\/?$/, "")
            .replace(/\/$/, "");
          imageUrl = `${baseUrl}${rawUrl.startsWith("/") ? "" : "/"}${rawUrl}`;
        }
      }

      setP({
        ...product,
        imageUrl, // updated URL
      });

      // Pick default variant (with size if available)
      const sizeVariants = product.variants?.filter((v) => v.size);
      setSelectedVariant(sizeVariants?.[0] || product.variants?.[0] || null);
    })();
  }, [id]);

  if (!p) return <Loader />;

  // ✅ Show dropdown if at least 1 size variant exists
  const sizeVariants = p.variants?.filter((v) => v.size) || [];
  const hasSizes = sizeVariants.length > 0;

  const price = selectedVariant ? selectedVariant.price : p.price;
  const isVariantAvailable = !!selectedVariant;

  const handleAddToCart = async () => {
    if (!isVariantAvailable) {
      alert("Please select a size");
      return;
    }

    // Update Recoil state
    setCart((s) => ({
      ...s,
      items: [...s.items, { ...p, variant: selectedVariant, qty: 1 }],
      totalQuantity: s.totalQuantity + 1,
      totalPrice: s.totalPrice + price,
    }));

    // Send to backend
    await addToCartService(selectedVariant._id, 1);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 backdrop-blur-3xl p-5">
      <img src={p.imageUrl} alt={p.name} className="h-fit w-full rounded-xl" />

      <div className="px-2 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {selectedVariant?.company?.name && (
            <h2 className="text-sm md:text-lg font-bold uppercase">
              {selectedVariant.company.name}
            </h2>
          )}

          <div className="">
            <p className="text-xs text-gray-200">{p.description}</p>

            <h1 className=" text-gray-200 text-sm md:text-2xl font-medium">
              {p.name}
            </h1>
          </div>
        </div>

        <div className="flex gap-1 items-center">
          <h1 className="text-sm font-extralight">MRP</h1>
          <span className="text-sm font-bold">₹{price}</span>
        </div>

        <div className="flex gap-2 justify-center mt-10">
          {/* ✅ Size dropdown if any size exists */}
          {hasSizes && (
            <select
              value={selectedVariant?._id || ""}
              onChange={(e) =>
                setSelectedVariant(
                  p.variants.find((v) => v._id === e.target.value)
                )
              }
              className=" w-fit border border-rose-600 rounded-lg px-3 text-sm text-rose-600 backdrop-blur-3xl"
            >
              {sizeVariants.map((variant) => (
                <option
                  key={variant._id}
                  value={variant._id}
                  style={{ color: "black" }}
                >
                  {variant.size?.value}
                </option>
              ))}
            </select>
          )}

          <div className=" flex items-center gap-4 bg-rose-600 rounded-lg">
            <button
              onClick={handleAddToCart}
              disabled={!isVariantAvailable}
              className={`rounded-lg border px-4 py-2 flex items-center gap-1 ${
                isVariantAvailable
                  ? "hover:bg-gray-100 hover:text-black"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <HiMiniShoppingBag /> Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
