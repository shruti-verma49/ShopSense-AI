import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Heart, MapPin, Settings, LogOut } from "lucide-react";
import toast from "react-hot-toast";

function ProfileSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    toast.success("Logged out successfully");
    navigate("/");
  };

  const links = [
    { to: "/profile", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/profile/orders", label: "My Orders", icon: Package },
    { to: "/profile/wishlist", label: "Wishlist", icon: Heart },
    { to: "/profile/addresses", label: "Saved Addresses", icon: MapPin },
    { to: "/profile/settings", label: "Account Settings", icon: Settings },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 md:min-h-[calc(100vh-64px)]">
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">My Account</h2>
      </div>
      <nav className="px-3 space-y-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
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

export default ProfileSidebar;