import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package, MapPin, Wallet, CreditCard, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { getOrderByIdApi } from "../services/orderService";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      setIsLoading(true);
      try {
        const response = await getOrderByIdApi(id);
        setOrder(response.data.order);
      } catch (error) {
        toast.error(error.response?.data?.message || "Could not load order details");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center text-gray-400 dark:text-gray-500">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order not found</h1>
        <Link to="/orders" className="mt-6 inline-flex items-center gap-2 text-[#6D5DF6] font-medium">
          <ArrowLeft size={16} />
          Back to My Orders
        </Link>
      </div>
    );
  }

  const { shippingAddress } = order;

  return (
    <div className="bg-white dark:bg-gray-900 min-h-[70vh] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link to="/orders" className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#6D5DF6] transition-colors duration-200">
          <ArrowLeft size={16} />
          Back to My Orders
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Order Details</h1>
        <p className="text-sm text-gray-400 dark:text-gray-500">Order ID: {order._id}</p>

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            {/* Order Timeline Placeholder */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Order Status</h2>
              <div className="mt-4 flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
                <div className="w-10 h-10 rounded-full bg-[#6D5DF6]/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={20} className="text-[#6D5DF6]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{order.orderStatus}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Detailed tracking coming soon</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Products</h2>
              <div className="mt-4 space-y-3">
                {order.products.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity} × ₹{item.price}</p>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Shipping Address</h2>
              <div className="mt-4 flex items-start gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
                <MapPin size={20} className="text-[#6D5DF6] mt-1 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{shippingAddress.fullName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {shippingAddress.houseNo}, {shippingAddress.street}
                    {shippingAddress.landmark ? `, ${shippingAddress.landmark}` : ""}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pincode}, {shippingAddress.country}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Phone: {shippingAddress.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Order Summary</h2>

              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                {order.paymentMethod === "COD" ? <Wallet size={16} /> : <CreditCard size={16} />}
                {order.paymentMethod === "COD" ? "Cash On Delivery" : "Online Payment"}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">Total Amount</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">₹{order.totalAmount}</span>
              </div>

              <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Package size={14} className="mt-0.5 shrink-0" />
                <span>
                  Estimated delivery:{" "}
                  {order.estimatedDeliveryDate
                    ? new Date(order.estimatedDeliveryDate).toLocaleDateString("en-IN", { day: "numeric", month: "long" })
                    : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;