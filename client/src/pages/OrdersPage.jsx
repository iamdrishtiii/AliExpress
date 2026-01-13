import React, { useEffect, useState } from "react";
import axios from "axios";
import { Authurl } from "../assets/api";
import Navbar from "../components/Navbar";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${Authurl}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [token]);

  if (!token) return <p>Please login to view your orders</p>;

  const cancelOrder = async (orderId) => {
    try {
      await axios.put(
        `${Authurl}/orders/cancel/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update UI instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to cancel order");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-24">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Order History
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-600 text-center">You have no orders yet.</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Items
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Payment
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, idx) => (
                  <tr
                    key={idx}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* Items */}
                    <td className="px-4 py-4 text-sm text-gray-700">
                      <ul className="space-y-1">
                        {order.items.map((item) => (
                          <li key={item.productId}>
                            {item.title} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>

                    {/* Total */}
                    <td className="px-4 py-4 font-semibold text-orange-600">
                      ₹{order.totalAmount}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 flex flex-col">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>

                      {order.status === "Placed" && (
                        <button
                          onClick={() => cancelOrder(order._id)}
                          className="py-1 rounded-full text-xs text-xs text-red-600 underline"
                        >
                          Cancel Order
                        </button>
                      )}
                    </td>

                    {/* Payment */}
                    <td className="px-4 py-4 text-sm text-gray-700">
                      {order.paymentMethod}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                      {new Date(order.orderedAt).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
