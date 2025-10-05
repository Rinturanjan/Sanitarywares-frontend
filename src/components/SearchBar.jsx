import { useEffect, useState, useRef } from "react";
import { getProducts } from "../services/productService";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const containerRef = useRef(null);
  const nav = useNavigate();

  // Fetch all products once
  useEffect(() => {
    (async () => {
      try {
        const products = await getProducts({});
        if (Array.isArray(products)) setAllProducts(products);
        else setAllProducts([]);
      } catch (err) {
        console.error("Failed to load products:", err);
        setAllProducts([]);
      }
    })();
  }, []);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Filter products
  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setFilteredProducts([]);
      return;
    }
    const results = allProducts.filter((product) =>
      product.name?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [debouncedSearchTerm, allProducts]);

  // Hide dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setFilteredProducts([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectProduct = (productName) => {
    setSearchTerm(productName);
    setFilteredProducts([]);
    nav(`/products?search=${encodeURIComponent(productName)}`);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    setFilteredProducts([]);
    nav(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col justify-center mx-auto w-64 md:hidden gap-2 relative"
    >
      <div className="relative w-full flex gap-2">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          placeholder="Search products..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-full border pl-10 pr-3 py-2 w-full"
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-gray-500 text-black px-14 py-3 rounded-full flex mx-auto w-fit transform transition-all duration-75 ease-in-out active:scale-95 active:bg-gray-100"
      >
        <span>Search</span>
      </button>

      {searchTerm && filteredProducts.length > 0 && (
        <ul className="absolute left-0 right-0 top-full mt-1 bg-white text-black border rounded max-h-60 overflow-y-auto shadow-lg z-10">
          {filteredProducts.map((product) => (
            <li
              key={product._id}
              onClick={() => handleSelectProduct(product.name)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-300"
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
