import { Link } from "react-router-dom";
import girl3 from "../assets/image/girl3.jpg";
import girl4 from "../assets/image/girl4.jpeg";
import { HiOutlineChevronDown } from "react-icons/hi2";
import SplitText from "../components/SplitText.jsx";
import { useNavigate } from "react-router-dom";

import pvcPipe from "../assets/image/pvcPipe.avif";
import cpvcPipe from "../assets/image/cpvcPipe.png";
import gi from "../assets/image/gi.jpg";
import tap from "../assets/image/tap.jpg";
import faucets from "../assets/image/faucets.jpg";
import showers from "../assets/image/showers.jpg";
import indianSeat from "../assets/image/indianSeat.jpg";
import englishSeat from "../assets/image/englishSeat.avif";
import jetSpray from "../assets/image/jetSpray.webp";
import slipPlas from "../assets/image/slipPlas.jpg";
import padLocks from "../assets/image/padLocks.webp";
import screwDriver from "../assets/image/screwDriver.jpg";
import astralLogo from "../assets/image/astralLogo.png";
import litexLogo from "../assets/image/litexLogo.png";
import prayagLogo from "../assets/image/prayagLogo.webp";
import supremeLogo from "../assets/image/supremeLogo.png";
import jaquarLogo from "../assets/image/jaquarLogo.png";
import anjulLogo from "../assets/image/anjulLogo.png";
import zotoLogo from "../assets/image/zotoLogo.png";
import selinamLogo from "../assets/image/selinamLogo.png";
import msealLogo from "../assets/image/msealLogo.avif";
import sonferryLogo from "../assets/image/sonferryLogo.png";
import heavIwareLogo from "../assets/image/heavIwareLogo.png";
import tapidoLogo from "../assets/image/tapidoLogo.png";
import astralPipes from "../assets/image/astralPipes.png";
// import mseal from "../assets/image/mseal.png";
import litexBg from "../assets/image/litexBg.jpg";
import jaquarBg from "../assets/image/jaquarBg.jpg";
import selinamBg from "../assets/image/selinamBg.webp";
import prayagBg from "../assets/image/prayagBg.jpg";
import anjulBg from "../assets/image/anjulBg.jpg";

import SearchBar from "../components/SearchBar.jsx";

import { FaToilet, FaFaucet, FaBath, FaLock, FaTools } from "react-icons/fa";

export default function Home() {
  const splittedText = SplitText("ABOUT US");
  const nav = useNavigate();

  // List of categories with their actual database IDs
  const categories = [
    {
      id: "68be9f9568d16cf240f3f995",
      name: "CPVC",
      icon: FaToilet,
      bgImage: cpvcPipe,
      bgColor: "rgb(252,236,29)",
    },
    {
      id: "68c7b915773e77abfacb391a",
      name: "PVC",
      icon: FaFaucet,
      bgImage: pvcPipe,
      bgColor: "rgba(255,0,0,1)",
    },
    {
      id: "68c7ba44773e77abfacb3939",
      name: "GI",
      bgImage: gi,
      bgColor: "rgba(16, 204, 78, 1)",
    },
    {
      id: "68c1be33ade95c0d9a17d4a7",
      name: "Taps",
      icon: FaFaucet,
      bgImage: tap,
      bgColor: "rgba(16, 111, 205, 1)",
    },
    {
      id: "68c7b97e773e77abfacb392a",
      name: "Faucets",
      icon: FaFaucet,
      bgImage: faucets,
      bgColor: "rgba(192, 44, 203, 1)",
    },
    {
      id: "68c7b9cc773e77abfacb3930",
      name: "Indian Toilet Seats",
      bgImage: indianSeat,
      bgColor: "rgba(145, 125, 61, 1)",
    },
    {
      id: "68c7b984773e77abfacb392d",
      name: "Showers",
      icon: FaBath,
      bgImage: showers,
      bgColor: "rgba(251, 173, 3, 1)",
    },
    {
      id: "68c7b9cf773e77abfacb3933",
      name: "English Toilet Seats",
      icon: FaToilet,
      bgImage: englishSeat,
      bgColor: "rgba(174, 0, 255, 1)",
    },
    {
      id: "68c7b9f4773e77abfacb3936",
      name: "Jet Spray",
      bgImage: jetSpray,
      bgColor: "rgba(129, 255, 0, 1)",
    },
    {
      id: "68c7bcbfe0bdcd1b04c2c36e",
      name: "Slip Plas",
      icon: FaLock,
      bgImage: slipPlas,
      bgColor: "rgba(0, 255, 249, 1)",
    },
    {
      id: "68c7bd61e0bdcd1b04c2c384",
      name: "Pad Locks",
      icon: FaLock,
      bgImage: padLocks,
      bgColor: "rgba(161, 34, 34, 1)",
    },
    {
      id: "68c7bcfae0bdcd1b04c2c371",
      name: "Screw Driver",
      icon: FaTools,
      bgImage: screwDriver,
      bgColor: "rgba(255, 123, 4, 1)",
    },
  ];

  const handleCategoryClick = (category) => {
    nav(`/products?category=${encodeURIComponent(category.id)}`, {
      state: { categoryName: category.name },
    });
  };

  return (
    <>
      <section className="space-y-6">
        <div className="page1 h-screen w-full bg-transparent flex flex-col my-auto gap-10 md:gap-28 md:flex md:flex-row xl:gap-52">
          <div className="title flex flex-col items-center mt-24 md:mt-54 md:ml-2 lg:mt-52 font-bold opacity-95 xl:mt-48">
            <p className="text-2xl md:text-5xl lg:text-7xl xl:text-8xl tracking-widest text-zinc-200 md:font-josefin">
              SANITARY
            </p>
            <p className="text-2xl md:text-5xl md:ml-12 lg:text-7xl xl:text-8xl tracking-widest text-white font-josefin [text-shadow:2px_2px_0_black,-2px_-2px_0_black,2px_-2px_0_black,-2px_2px_0_black]">
              WARES
            </p>
          </div>

          <div className="text-white opacity-95 flex flex-col md: mt-10 lg:pt-1 lg:mr- lg:ml-12 gap-6 ">
            <div className="md:flex md:right-2 relative hidden ">
              <span className="w-fit">
                <img
                  src={girl3}
                  alt=""
                  className="md:size-72 lg:size-72 md:rounded-full"
                />
              </span>

              <span className="md:-ml-28">
                <img
                  src={girl4}
                  alt=""
                  className="md:size-32 lg:size-40 md:rounded-full "
                />
              </span>
            </div>

            <div className="flex flex-col items-center lg:flex lg:items-start lg:ml-10 ">
              <div className="text-lg lg:mt-4 lg:text-2xl tracking-widest ">
                <span className="cursor-pointer">
                  <SplitText text="ABOUT US" />
                </span>
              </div>

              {/* slogan */}
              <div className=" md:block w-fit ">
                <div className="flex flex-col gap-4">
                  <div className="tracking-widest flex flex-col items-center lg:flex lg:items-start md:text-sm">
                    <p className="">Where quality meets elegance in </p>
                    <p className="">Sanitary Wares</p>
                  </div>

                  <div className="bg-white rounded-lg h-6 w-7 text-black hidden xl:block ">
                    <HiOutlineChevronDown className="mx-auto xl:flex xl:mt-1"></HiOutlineChevronDown>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SearchBar />
        </div>

        <div className=""></div>

        {/* page2 */}
        <div className="md:bg-gray-600 md:pt-5 md:pb-12 md:px-12 rounded-2xl">
          <h2 className="mb-3 text-lg font-semibold uppercase tracking-widest">
            Categories
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className="rounded-xl overflow-hidden cursor-pointer group h-32 relative bg-cover bg-center transition-transform hover:scale-105"
                  style={{ backgroundImage: `url(${category.bgImage})` }}
                >
                  {/* Overlay with dynamic background color using inline style for opacity */}
                  <div
                    className="absolute inset-0 opacity-55 group-hover:opacity-100 transition duration-300"
                    style={{
                      background: `linear-gradient(to right, ${category.bgColor} 0%, rgba(0,0,0,0) 100%)`,
                      // opacity: 0.4,
                    }}
                  ></div>

                  {/* Text container with semi-transparent background using rgba */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    // style={{
                    //   background:
                    //     "linear-gradient(to right, rgba(252,13,0,0.80), rgba(0,0,0,0))",
                    // }}
                  >
                    <div className="text-center px-2">
                      {Icon && (
                        <Icon className="text-3xl text-white mb-2 mx-auto" />
                      )}
                      <span className="text-white text-sm font-semibold tracking-widest">
                        {category.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* page3 */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-center ml-3 mt-7 gap-2 bg-gradient-to-t from-yellow-300/65 to-white/0 h-24">
            <h1 className=" text-4xl uppercase font-semibold tracking-widest flex items-center text-yellow-500">
              top brands
            </h1>
            <span className="flex items-center text-2xl">👑</span>
          </div>

          <div className="flex flex-col gap-4 px-2 md:grid md:grid-cols-2 md:gap-4 lg:grid lg:grid-cols-3 ">
            <span className="p-[4px] rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
              <div className="bg-white flex flex-col items-center rounded-lg">
                <img src={astralPipes} className="h-40 w-full " />
                <div className="flex m-4 gap-5">
                  <img
                    src={supremeLogo}
                    className="h-6 w-18 my-auto bg-white"
                    onClick={() =>
                      nav(`/products?company=Supreme`, {
                        state: { companyName: "Supreme" },
                      })
                    }
                  />
                  <div className="h-8 w-px bg-gray-300 mx-2"></div>
                  <img
                    src={astralLogo}
                    className="h-8 w-20 my-auto"
                    onClick={() =>
                      nav(`/products?company=Astral`, {
                        state: { companyName: "Astral" },
                      })
                    }
                  />
                </div>
              </div>
            </span>

            <span className="p-[4px] rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
              <div className="bg-white flex flex-col items-center rounded-lg">
                <img src={litexBg} className="h-40 w-full " />
                <div className="flex m-4 gap-5">
                  <img
                    src={litexLogo}
                    className="h-6 w-18 my-auto"
                    onClick={() =>
                      nav(`/products?company=Litex`, {
                        state: { companyName: "Litex" },
                      })
                    }
                  />
                  <div className="h-8 w-px bg-gray-300 mx-2"></div>
                  <img
                    src={zotoLogo}
                    className="h-8 bg-white w-20 my-auto"
                    onClick={() =>
                      nav(`/products?company=Zoto`, {
                        state: { companyName: "Zoto" },
                      })
                    }
                  />
                </div>
              </div>
            </span>

            <span className="p-[4px] rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
              <div className="bg-white flex flex-col items-center rounded-lg">
                <img src={jaquarBg} className="h-40 w-full " />
                <div className="flex m-4 gap-5">
                  <img
                    src={jaquarLogo}
                    className="h-6 w-18 my-auto"
                    onClick={() =>
                      nav(`/products?company=Jaquar`, {
                        state: { companyName: "Jaquar" },
                      })
                    }
                  />
                  <div className="h-8 w-px bg-gray-300 mx-2"></div>
                  <img
                    src={sonferryLogo}
                    className="h-8 w-20 my-auto"
                    onClick={() =>
                      nav(`/products?company=Sonferry`, {
                        state: { companyName: "Sonferry" },
                      })
                    }
                  />
                </div>
              </div>
            </span>

            <span className="p-[4px] rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
              <div className="bg-white flex flex-col items-center rounded-lg">
                <img src={selinamBg} className="h-40 w-full " />
                <div className="flex m-4 gap-5">
                  <img
                    src={heavIwareLogo}
                    className="h-8 w-18 my-auto"
                    onClick={() =>
                      nav(`/products?company=Heaviware`, {
                        state: { companyName: "Heaviware" },
                      })
                    }
                  />
                  <div className="h-8 w-px bg-gray-300 mx-2"></div>
                  <img
                    src={selinamLogo}
                    className="h-8 w-20 my-auto"
                    onClick={() =>
                      nav(`/products?company=Selinam`, {
                        state: { companyName: "Selinam" },
                      })
                    }
                  />
                </div>
              </div>
            </span>

            <span className="p-[4px] rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
              <div className="bg-white flex flex-col items-center rounded-lg">
                <img src={prayagBg} className="h-40 w-full " />
                <div className="flex m-4 gap-5">
                  <img
                    src={prayagLogo}
                    className="h-6 w-18 my-auto"
                    onClick={() =>
                      nav(`/products?company=Prayag`, {
                        state: { companyName: "Prayag" },
                      })
                    }
                  />
                  <div className="h-8 w-px bg-gray-300 mx-2"></div>
                  <img
                    src={tapidoLogo}
                    className="h-8 w-20 my-auto"
                    onClick={() =>
                      nav(`/products?company=Tapido`, {
                        state: { companyName: "Tapido" },
                      })
                    }
                  />
                </div>
              </div>
            </span>

            <span className="p-[4px] rounded-lg bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
              <div className="bg-white flex flex-col items-center rounded-lg">
                <img src={anjulBg} className="h-40 w-full " />
                <div className="flex m-4 gap-5">
                  <img
                    src={anjulLogo}
                    className="h-8 w-18 my-auto bg-white pb-1"
                    onClick={() =>
                      nav(`/products?company=Anjul`, {
                        state: { companyName: "Anjul" },
                      })
                    }
                  />
                  <div className="h-8 w-px bg-gray-300 mx-2"></div>
                  <img
                    src={msealLogo}
                    className="h-8 w-20 my-auto"
                    onClick={() =>
                      nav(`/products?company=Mseal`, {
                        state: { companyName: "Mseal" },
                      })
                    }
                  />
                </div>
              </div>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
