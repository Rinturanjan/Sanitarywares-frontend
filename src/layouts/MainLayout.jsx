import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import BG from "../components/BG";
import CustomCursor from "../components/CustomCursor";

export default function MainLayout() {
  //  const location = useLocation();

  //  const showBG = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-white relative overflow-hidden">
      <CustomCursor />
      <main className="flex-1 mx-auto max-w-6xl pt-16 xl:pt-20 relative z-10">
        {/* {showBG && <BG />} */}
        <BG />
        <Outlet />
      </main>
      <Footer className="" />
    </div>
  );
}
