import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "../../components/admin/AdminLayout";
import { getAdminOrdersApi, updateOrderStatusApi } from "../../services/adminService";

const STATUS_OPTIONS = ["Placed", "Confirmed", "Packed", "Shipped", "Out For Delivery", "Delivered", "Cancelled"];

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const response = await getAdminOrdersApi({ search, page, limit: 10 });
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      toast.error("Could not load orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    loadOrders();
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatusApi(orderId, newStatus);
      toast.success("Order status updated");
      setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, deliveryStatus: newStatus } : o)));
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update status");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>

      <form onSubmit={handleSearch} className="mt-6 flex gap-2 max-w-md">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID, customer name or email..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-[#6D5DF6]"
          />
        </div>
        <button type="submit" className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium">Search</button>
      </form>

      <div className="mt-6 overflow-x-auto">
        {isLoading ? (
          <p className="text-gray-400 text-sm">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-400 text-sm">No orders found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                <th className="py-2 pr-4">Order ID</th>
                <th className="py-2 pr-4">Customer</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Payment</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Delivery Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 pr-4 text-gray-900 dark:text-white text-xs">{order._id}</td>
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">
                    {order.user?.name}<br /><span className="text-xs text-gray-400">{order.user?.email}</span>
                  </td>
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">₹{order.totalAmount}</td>
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">{order.paymentMethod === "COD" ? "COD" : "Online"}</td>
                  <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">{order.paymentStatus}</td>
                  <td className="py-3 pr-4">
                    <select
                      value={order.deliveryStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs outline-none focus:border-[#6D5DF6]"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-lg text-sm font-medium ${page === i + 1 ? "bg-[#6D5DF6] text-white" : "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

export default Orders;