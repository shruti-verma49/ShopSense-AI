import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import toast from "react-hot-toast";
import ProfileLayout from "../../components/profile/ProfileLayout";
import DeliveryStatusBadge from "../../components/DeliveryStatusBadge";
import { getOrdersApi } from "../../services/orderService";

function OrdersPreview() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOrdersApi()
      .then((res) => setOrders(res.data.orders.slice(0, 5)))
      .catch(() => toast.error("Could not load your orders"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ProfileLayout>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Orders</h1>
        <Link to="/orders" className="text-sm text-[#6D5DF6] font-medium hover:underline">
          View All Orders
        </Link>
      </div>

      <div className="mt-6 space-y-4">
        {isLoading ? (
          <p className="text-gray-400 text-sm">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center text-center py-12">
            <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
              <Package size={32} className="text-gray-300 dark:text-gray-600" />
            </div>
            <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">No orders yet</h2>
            <Link to="/" className="mt-6 px-6 py-3 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200">
              Start Shopping
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <Link
              key={order._id}
              to={`/orders/${order._id}`}
              className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 hover:border-[#6D5DF6]/40 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Order ID: {order._id}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(order.orderDate || order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <DeliveryStatusBadge status={order.deliveryStatus} />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">{order.products.length} item(s)</span>
                <span className="font-semibold text-gray-900 dark:text-white">₹{order.totalAmount}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </ProfileLayout>
  );
}

export default OrdersPreview;