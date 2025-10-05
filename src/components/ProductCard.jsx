import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ProductCard({
  product,
  categoryName,
  companyName,
  onAdd,
  onWishlist,
}) {
  const sizeVariants = product.variants?.filter((variant) => variant.size);
  // const hasMultipleSizes = sizeVariants && sizeVariants.length > 1;

  const [selectedVariant, setSelectedVariant] = useState(
    sizeVariants?.[0] || product.variants?.[0] || null
  );

  useEffect(() => {
    setSelectedVariant(sizeVariants?.[0] || product.variants?.[0] || null);
  }, [product]);

  const price = selectedVariant ? selectedVariant.price : product.price;
  const isVariantAvailable = !!selectedVariant;

  return (
    <div className="rounded-xl border-none px-1 ">
      <Link to={`/products/${product._id}`}>
        <img
          src={
            product.imageUrl?.startsWith("http")
              ? product.imageUrl
              : `http://localhost:5000${product.imageUrl}`
          }
          alt={product.name}
          className="h-48 w-full rounded-lg object-cover"
        />
      </Link>

      {/* companyName, wishlistBtn */}
      <div className="flex justify-between items-center mt-1">
        <p className="font-semibold text-xs md:text-sm">{companyName}</p>

        {/* wishlistHeartBtn */}
        <button
          onClick={() => onWishlist(product, selectedVariant?._id)}
          disabled={!isVariantAvailable}
          className={`relative inline-flex items-center justify-center px-2 pt-2 rounded-full transition ${
            isVariantAvailable
              ? "group cursor-pointer"
              : "opacity-50 cursor-not-allowed"
          }`}
        >
          <AiOutlineHeart
            size={18}
            className="text-gray-500 transition-opacity duration-150 group-hover:opacity-0"
          />
          <AiFillHeart
            size={18}
            className="text-red-600 absolute inset-0 m-auto opacity-0 transition-opacity duration-150 group-hover:opacity-100 pointer-events-none"
          />
        </button>
      </div>
    
      {/* categoryNAme, productName */}
      <p className="text-[10px] md:text-xs text-gray-300"></p>

      <h3 className="line-clamp-1 text-[11px] md:text-xs text-gray-300 font-light tracking-wide">
        {product.category?.name}
      </h3>
      <h3 className="line-clamp-1 text-[11px] md:text-xs text-gray-300 font-light tracking-wide">
        {product.name}
      </h3>

      {/* Size dropdown - commented */}
      {/*
      {hasMultipleSizes && (
        <select
          value={selectedVariant?._id || ""}
          onChange={(e) =>
            setSelectedVariant(sizeVariants.find((v) => v._id === e.target.value))
          }
          className="mt-2 w-full border rounded-lg px-3 py-1 text-sm"
        >
          {sizeVariants.map((variant) => (
            <option key={variant._id} value={variant._id} style={{ color: "black" }}>
              {variant.size.value}
            </option>
          ))}
        </select>
      )}
      */}

      {/* price */}
      <div className="mt-1 flex items-center justify-between">
        <span className="font-semibold text-xs md:text-sm">₹{price}</span>

        {/* Add to Cart button - commented */}
        {/*
        <button
          onClick={() => onAdd(product, selectedVariant?._id)}
          disabled={!isVariantAvailable}
          className={`rounded-lg border px-3 py-1 text-xs ${
            isVariantAvailable ? "hover:bg-gray-100 hover:text-black" : "opacity-50 cursor-not-allowed"
          }`}
        >
          Add to Cart
        </button>
        */}

        {/* <button
          onClick={() => onWishlist(product, selectedVariant?._id)}
          disabled={!isVariantAvailable}
          className={`rounded-lg border px-3 py-1 text-sm ${
            isVariantAvailable ? "hover:bg-gray-100 hover:text-black" : "opacity-50 cursor-not-allowed"
          }`}
        >
          <CiHeart />
        </button> */}
      </div>
    </div>
  );
}
