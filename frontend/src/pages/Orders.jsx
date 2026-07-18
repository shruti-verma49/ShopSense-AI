import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { getOrdersApi } from "../services/orderService";
import DeliveryStatusBadge from "../components/DeliveryStatusBadge";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await getOrdersApi();
        setOrders(response.data.orders);
      } catch (error) {
        toast.error("Could not load your orders");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-[60vh] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>

        {isLoading ? (
          <p className="mt-8 text-gray-400 text-sm">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
              <Package size={32} className="text-gray-300 dark:text-gray-600" />
            </div>
            <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">No orders yet</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm">
              Your placed orders will show up here.
            </p>
            <Link
              to="/"
              className="mt-6 px-6 py-3 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {orders.map((order) => (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}
                className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 hover:border-[#6D5DF6]/40 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Order ID: {order._id}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(order.orderDate || order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      {order.paymentMethod === "COD" ? "Cash On Delivery" : "Online Payment"}
                    </p>
                  </div>
                  <DeliveryStatusBadge status={order.deliveryStatus} />
                </div>

                <div className="mt-4 space-y-1">
                  {order.products.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span className="truncate">{item.title} × {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <span className="font-semibold text-gray-900 dark:text-white">Total: ₹{order.totalAmount}</span>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;