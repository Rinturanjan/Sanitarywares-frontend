import { Outlet, NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../recoil/authAtom";
import BG from "../components/BG";

export default function DashboardLayout() {
  const { role, user } = useRecoilValue(authAtom);

  console.log("Dashboard authAtom:", { role, user });

  return (
    <>
      <div className="pt-24 pl-5">

        <div className="pb-7">
          <h2 className="text-lg font-semibold tracking-wider text-white ">
            Account
          </h2>
          <p className="text-white text-[10px] tracking-wider ">
            {user?.name}
          </p>
        </div>

        <div className="md:grid min-h-screen md:grid-cols-12 text-white md:border-t ">
          <BG />
          <aside className=" md:col-span-3 md:border-r md:p-4 md:backdrop-blur-3xl">
            {role === "admin" ? (
              <nav className="flex flex-col gap-2 text-sm">
                <NavLink to="/dashboard/admin" end>
                  Overview
                </NavLink>
                <NavLink to="/dashboard/admin/products">
                  Manage Products
                </NavLink>
                <NavLink to="/dashboard/admin/orders">Manage Orders</NavLink>
                <NavLink to="/dashboard/admin/users">Manage Users</NavLink>
              </nav>
            ) : (
              <nav className="flex flex-col gap-2 text-sm">
                <NavLink to="/dashboard/user" end>
                  Overview
                </NavLink>
                <NavLink to="/dashboard/user/orders">My Orders</NavLink>
                <NavLink to="/dashboard/user/profile">Profile</NavLink>
              </nav>
            )}
          </aside>
          <section className="col-span-9 p-4">
            <Outlet />
          </section>
        </div>
      </div>
    </>
  );
}
