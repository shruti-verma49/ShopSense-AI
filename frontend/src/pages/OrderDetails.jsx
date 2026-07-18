import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Package, MapPin, Wallet, CreditCard, LifeBuoy, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { getOrderByIdApi, cancelOrderApi } from "../services/orderService";
import DeliveryTimeline from "../components/DeliveryTimeline";
import DeliveryStatusBadge from "../components/DeliveryStatusBadge";

const PAYMENT_STATUS_STYLES = {
  Paid: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  Pending: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
  Failed: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
};

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);

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

  useEffect(() => {
    loadOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const canCancel = order && ["Placed", "Confirmed"].includes(order.deliveryStatus);

  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    setIsCancelling(true);
    try {
      const response = await cancelOrderApi(order._id);
      setOrder(response.data.order);
      toast.success("Order cancelled");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not cancel this order");
    } finally {
      setIsCancelling(false);
    }
  };

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

        <div className="mt-4 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order Details</h1>
            <p className="text-sm text-gray-400 dark:text-gray-500">Order ID: {order._id}</p>
          </div>
          <DeliveryStatusBadge status={order.deliveryStatus} />
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Delivery Status</h2>
              <div className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <DeliveryTimeline currentStatus={order.deliveryStatus} />
                {order.estimatedDeliveryDate && order.deliveryStatus !== "Delivered" && order.deliveryStatus !== "Cancelled" && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Package size={14} />
                    Expected by {new Date(order.estimatedDeliveryDate).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}
                  </p>
                )}
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

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Need Help?</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="mailto:support@shopsense.ai"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-all duration-200"
                >
                  <LifeBuoy size={16} />
                  Contact Support
                </a>

                {canCancel && (
                  <button
                    onClick={handleCancelOrder}
                    disabled={isCancelling}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <XCircle size={16} />
                    {isCancelling ? "Cancelling..." : "Cancel Order"}
                  </button>
                )}
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

              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Payment Status</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${PAYMENT_STATUS_STYLES[order.paymentStatus] || ""}`}>
                  {order.paymentStatus}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">Total Amount</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">₹{order.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;