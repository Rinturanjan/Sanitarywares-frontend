import { Link, NavLink, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom } from "../recoil/authAtom.js";
import { cartAtom } from "../recoil/cartAtom.js";
import { useState, useEffect, useRef } from "react";
import { getProducts } from "../services/productService.js";
import { logout } from "../services/authService.js";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MdOutlinePlumbing } from "react-icons/md";
import { AiOutlineInbox } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineLogin } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BsPersonVcardFill } from "react-icons/bs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);
  const setCart = useSetRecoilState(cartAtom);

  // const [cart, setCart] = useRecoilState(cartAtom);
  const nav = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1); // ✅ for keyboard navigation

  const containerRef = useRef(null);

  // Fetch all products once for search suggestions
  useEffect(() => {
    (async () => {
      try {
        const products = await getProducts({});
        if (Array.isArray(products)) setAllProducts(products);
        else setAllProducts([]);
      } catch (err) {
        console.error("Failed to load products for search:", err);
        setAllProducts([]);
      }
    })();
  }, []);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Filter products based on search term
  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      setFilteredProducts([]);
      return;
    }
    const results = allProducts.filter((product) =>
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setFilteredProducts(results);
    setActiveIndex(-1); // reset navigation index when term changes
  }, [debouncedSearchTerm, allProducts]);

  // Handle clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setFilteredProducts([]); // Hide recommendations
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectProduct = (productName) => {
    setSearchTerm(productName);
    setFilteredProducts([]);
    setActiveIndex(-1);
    nav(`/products?search=${encodeURIComponent(productName)}`);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    setFilteredProducts([]);
    setActiveIndex(-1);
    nav(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  // ✅ Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < filteredProducts.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : filteredProducts.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filteredProducts.length) {
        handleSelectProduct(filteredProducts[activeIndex].name);
      } else {
        handleSearch();
      }
    }
  };

  const handleLogout = () => {
    logout(setAuth, setCart);
    nav("/auth/login");
  };

  // NavBar Text animation
  useGSAP(() => {
    var tl = gsap.timeline();

    tl.from(".navbar", {
      y: -10,
      opacity: 0,
      duration: 1,
      delay: 0.5,
    });

    tl.from(".midnav", {
      y: -10,
      opacity: 0,
      duration: 0.9,
      stagger: 0.3,
    });

    tl.from(".endnav", {
      y: -10,
      opacity: 0,
      duration: 0.9,
      stagger: 0.3,
    });
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-20 h-14 lg:h-16 xl:h-20 backdrop-blur-md text-white">
      <nav className="mx-auto flex items-center justify-between h-full px-4 ">
        {/* Left Section */}
        <div className="navbar flex items-center gap-1">
          <MdOutlinePlumbing className="text-xl" />
          <Link
            to="/"
            className="text-xs md:text-[2.1vw] lg:text-lg font-bold uppercase md:tracking-widest"
          >
            Sanitary Wares
          </Link>
        </div>

        {/* Center Section: Search Bar */}
        <div
          ref={containerRef}
          className="midnav left-1/2 xl:left-1/4 transform -translate-x-1/2 w-64 hidden lg:block "
        >
          <div className="relative w-full flex gap-2">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

            <input
              type="text"
              value={searchTerm}
              placeholder="Search products..."
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 rounded-full border px-3 lg:pl-10 lg:p-2 py-1 w-full"
            />
            <button
              onClick={handleSearch}
              className="bg-white text-black px-3 py-1 rounded-full transform transition-all duration-75 ease-in-out active:scale-95 active:bg-gray-100"
            >
              <FiSearch />
            </button>
          </div>

          {searchTerm && filteredProducts.length > 0 && (
            <ul className="absolute left-0 right-0 top-full backdrop:blur-lg text-white border mt-1 rounded max-h-60 overflow-y-auto shadow-lg z-10">
              {filteredProducts.map((product, index) => (
                <li
                  key={product._id}
                  onClick={() => handleSelectProduct(product.name)}
                  className={`cursor-pointer px-4 py-2 backdrop-blur-lg hover:bg-gray-300 hover:text-black ${index === activeIndex ? "bg-gray-400 text-black" : ""}`}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Section */}
        <ul className="flex items-center text-lg lg:text-2xl xl:text-lg xl:font-bold gap-4 md:gap-6 xl:uppercase xl:tracking-widest">
          <NavLink to="/products">
            <AiOutlineInbox className="xl:hidden endnav" />
            <span className="hidden xl:block endnav">Products</span>
          </NavLink>
          <NavLink to="/cart">
            <FaOpencart className="xl:hidden endnav" />
            <span className="hidden xl:block endnav">cart</span>
          </NavLink>
          <NavLink to="/wishlist">
            <FaHeart className="xl:hidden endnav" />
            <span className="hidden xl:block endnav">wishlist</span>
          </NavLink>
          {auth.isLoggedIn ? (
            <>
              {auth.role === "admin" && (
                <NavLink to="/dashboard/admin">
                  <FaUserGear className="xl:hidden endnav" />
                  <span className="hidden xl:block endnav">admin</span>
                </NavLink>
              )}
              {auth.role === "user" && (
                <NavLink to="/dashboard/user">
                  <FaUserCircle className="xl:hidden endnav" />
                  <span className="hidden xl:block endnav">profile</span>
                </NavLink>
              )}
              <button
                onClick={handleLogout}
                className="bg-none border-none cursor-pointer xl:uppercase"
              >
                <AiOutlineLogout className="xl:hidden endnav" />
                <span className="hidden xl:block endnav">logout</span>
              </button>
            </>
          ) : (
            <>
              <NavLink to="/auth/login" className="hover:underline">
                <AiOutlineLogin className="xl:hidden endnav" />
                <span className="hidden xl:block endnav">login</span>
              </NavLink>
              <NavLink to="/auth/signup" className="hover:underline">
                <BsPersonVcardFill className="xl:hidden endnav" />
                <span className="hidden xl:block endnav">signup</span>
              </NavLink>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
