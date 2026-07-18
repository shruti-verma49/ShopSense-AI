import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import Addresses from "./pages/Addresses";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import AdminRoute from "./components/admin/AdminRoute";
import AdminHome from "./pages/admin/AdminHome";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminUsers from "./pages/admin/UsersPage";
import ProfileDashboard from "./pages/profile/Dashboard";
import ProfileOrdersPreview from "./pages/profile/OrdersPreview";
import ProfileWishlistPreview from "./pages/profile/WishlistPreview";
import ProfileAddressesPage from "./pages/profile/AddressesPage";
import ProfileAccountSettings from "./pages/profile/AccountSettings";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/admin" element={<AdminRoute><AdminHome /></AdminRoute>} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
        <Route path="/profile" element={<ProfileDashboard />} />
        <Route path="/profile/orders" element={<ProfileOrdersPreview />} />
        <Route path="/profile/wishlist" element={<ProfileWishlistPreview />} />
        <Route path="/profile/addresses" element={<ProfileAddressesPage />} />
        <Route path="/profile/settings" element={<ProfileAccountSettings />} />
      </Routes>
    </div>
  );
}

export default App;