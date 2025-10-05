import { useRecoilValue } from "recoil";
import { cartAtom } from "../recoil/cartAtom";
import { addressAtom } from "../recoil/addressAtom";

export default function Checkout() {
  const cart = useRecoilValue(cartAtom);
  const { addresses, selectedAddress } = useRecoilValue(addressAtom);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <div>
        <h2 className="font-semibold">Delivery Address</h2>
        <p className="text-sm text-gray-600">
          {addresses.length ? (selectedAddress || addresses[0]).line1 : "Add an address in profile"}
        </p>
      </div>
      <div>
        <h2 className="font-semibold">Order Summary</h2>
        <p className="text-sm text-gray-600">{cart.totalQuantity} items • Total ₹{cart.totalPrice}</p>
      </div>
      <button className="rounded-lg bg-green-600 px-4 py-2 text-white">Place Order</button>
    </section>
  );
}
