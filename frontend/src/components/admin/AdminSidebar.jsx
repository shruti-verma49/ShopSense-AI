import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut } from "lucide-react";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/products", label: "Products", icon: Package },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { to: "/admin/users", label: "Users", icon: Users },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 md:min-h-[calc(100vh-64px)]">
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Admin Panel</h2>
      </div>
      <nav className="px-3 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#6D5DF6] text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default AdminSidebar;