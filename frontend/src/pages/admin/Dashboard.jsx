import { useState, useEffect } from "react";
import { Users, Package, ShoppingBag, Clock, CheckCircle2, IndianRupee } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "../../components/admin/AdminLayout";
import { getDashboardStatsApi } from "../../services/adminService";

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#6D5DF6]/10 flex items-center justify-center">
          <Icon size={20} className="text-[#6D5DF6]" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await getDashboardStatsApi();
        setStats(response.data.stats);
      } catch (error) {
        toast.error("Could not load dashboard stats");
      } finally {
        setIsLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

      {isLoading ? (
        <p className="mt-6 text-gray-400 text-sm">Loading stats...</p>
      ) : stats ? (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard icon={Users} label="Total Users" value={stats.totalUsers} />
          <StatCard icon={Package} label="Total Products" value={stats.totalProducts} />
          <StatCard icon={ShoppingBag} label="Total Orders" value={stats.totalOrders} />
          <StatCard icon={Clock} label="Pending Orders" value={stats.pendingOrders} />
          <StatCard icon={CheckCircle2} label="Delivered Orders" value={stats.deliveredOrders} />
          <StatCard icon={IndianRupee} label="Revenue" value={`₹${stats.revenue}`} />
        </div>
      ) : (
        <p className="mt-6 text-gray-400 text-sm">No data available.</p>
      )}
    </AdminLayout>
  );
}

export default Dashboard;