import { Link, useLocation, Navigate } from "react-router-dom";
import { CheckCircle2, Package } from "lucide-react";

function formatDeliveryDate(dateValue) {
  const date = dateValue ? new Date(dateValue) : new Date();
  if (!dateValue) date.setDate(date.getDate() + 5);
  return date.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
}

function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/orders" replace />;
  }

  const isCOD = order.paymentMethod !== "Online";

  return (
    <div className="bg-white dark:bg-gray-900 min-h-[70vh] transition-colors duration-300">
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
          <CheckCircle2 size={40} className="text-green-500" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
          {isCOD ? "Order Placed Successfully" : "Payment Successful"}
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Your order has been placed successfully.</p>

        <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-left space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Order ID</span>
            <span className="font-medium text-gray-900 dark:text-white">{order._id}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Payment Method</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {isCOD ? "Cash On Delivery" : "Online Payment"}
            </span>
          </div>
          {!isCOD && order.paymentId && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Payment ID</span>
              <span className="font-medium text-gray-900 dark:text-white">{order.paymentId}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Total Amount</span>
            <span className="font-semibold text-gray-900 dark:text-white">₹{order.totalAmount}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Estimated Delivery</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatDeliveryDate(order.estimatedDeliveryDate)}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex-1 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-all duration-200"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200"
          >
            <Package size={16} />
            Go To My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;