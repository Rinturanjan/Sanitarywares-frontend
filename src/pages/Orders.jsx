import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { orderAtom } from "../recoil/orderAtom";

export default function Orders() {
  const [orders, setOrders] = useRecoilState(orderAtom);

  useEffect(() => {
    // fetch orders for current user if needed
  }, []);

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">My Orders</h1>
      {orders.list.length === 0 ? "No orders yet." : (
        <ul className="space-y-2">
          {orders.list.map(o => (
            <li key={o._id} className="rounded-xl border p-3">
              <div className="font-semibold">Order #{o._id}</div>
              <div className="text-sm text-gray-600">{o.items.length} items • ₹{o.total}</div>
              <div className="text-sm">Status: {o.status}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
