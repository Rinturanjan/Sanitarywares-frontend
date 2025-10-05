import { useRecoilValue, useSetRecoilState } from "recoil";
import { Navigate } from "react-router-dom";
import { authAtom } from "../recoil/authAtom.js";
// import { cartAtom } from "../recoil/cartAtom.js";

export default function ProtectedRoute({ children, role }) {
  const auth = useRecoilValue(authAtom);
  // const setCart = useSetRecoilState(cartAtom);

  if (!auth.isLoggedIn) {
    // Reset the cart if user is not logged in
    // setCart({
    //   items: [],
    //   totalQuantity: 0,
    //   totalPrice: 0
    // });
    return <Navigate to="/auth/login" replace />;
  }

  if (role && auth.role !== role) {
    // Optionally reset cart or handle unauthorized access differently
    // setCart({
    //   items: [],
    //   totalQuantity: 0,
    //   totalPrice: 0
    // });
    return <Navigate to="/" replace />;
  }

  return children;
}
