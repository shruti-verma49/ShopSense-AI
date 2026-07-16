import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <WishlistProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </div>
      </BrowserRouter>
    </WishlistProvider>
  );
}

export default App;