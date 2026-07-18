import { useState, useEffect } from "react";
import { User, Package, Heart, MapPin, ShoppingCart, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import ProfileLayout from "../../components/profile/ProfileLayout";
import { getProfileApi, updateProfileApi } from "../../services/authService";
import { getOrdersApi } from "../../services/orderService";
import { getAddressesApi } from "../../services/addressService";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

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
  const { wishlistItems } = useWishlist();
  const { cartItems } = useCart();
  const [profile, setProfile] = useState(null);
  const [orderCount, setOrderCount] = useState(0);
  const [addressCount, setAddressCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [profileRes, ordersRes, addressesRes] = await Promise.all([
        getProfileApi(),
        getOrdersApi(),
        getAddressesApi(),
      ]);
      setProfile(profileRes.data.user);
      setFormData({ name: profileRes.data.user.name || "", phone: profileRes.data.user.phone || "" });
      setOrderCount(ordersRes.data.count ?? ordersRes.data.orders?.length ?? 0);
      setAddressCount(addressesRes.data.addresses?.length ?? 0);
    } catch (error) {
      toast.error("Could not load your account details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await updateProfileApi(formData);
      const updatedUser = response.data.user;
      setProfile(updatedUser);

      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...storedUser, name: updatedUser.name, phone: updatedUser.phone }));
      window.dispatchEvent(new Event("authChange"));

      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <ProfileLayout>
        <p className="text-gray-400 text-sm">Loading your account...</p>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout>
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6D5DF6] to-[#5B8DEF] flex items-center justify-center text-white text-xl font-bold shrink-0">
              {profile?.name?.charAt(0).toUpperCase() || <User size={28} />}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{profile?.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{profile?.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{profile?.phone || "No phone number added"}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Member since {new Date(profile?.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-all duration-200"
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          )}
        </div>

        {isEditing && (
          <form onSubmit={handleSubmit} className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1.5 w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-[#6D5DF6]"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="mt-1.5 w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:border-[#6D5DF6]"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                value={profile?.email}
                disabled
                className="mt-1.5 w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-400 cursor-not-allowed"
              />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 rounded-xl bg-[#6D5DF6] text-white font-medium disabled:opacity-60">
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
              <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Total Orders" value={orderCount} />
        <StatCard icon={Heart} label="Wishlist Items" value={wishlistItems.length} />
        <StatCard icon={MapPin} label="Saved Addresses" value={addressCount} />
        <StatCard icon={ShoppingCart} label="Active Cart Items" value={cartItems.length} />
      </div>
    </ProfileLayout>
  );
}

export default Dashboard;