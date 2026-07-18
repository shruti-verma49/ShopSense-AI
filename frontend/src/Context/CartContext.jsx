import { createContext, useContext, useState, useEffect } from "react";
import { getCartApi, addToCartApi, updateCartItemApi, removeFromCartApi } from "../services/cartService";
import { normalizeProduct } from "../utils/productAdapter";

const CartContext = createContext();

function mapCartResponse(cart) {
  if (!cart || !cart.products) return [];
  return cart.products
    .filter((item) => item.product)
    .map((item) => ({
      ...normalizeProduct(item.product),
      quantity: item.quantity,
    }));
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      refreshCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshCart = async () => {
    try {
      const response = await getCartApi();
      setCartItems(mapCartResponse(response.data.cart));
    } catch (error) {
      // User may not be logged in yet — safe to ignore here
    }
  };

  const addToCart = async (product, quantity = 1) => {
    const response = await addToCartApi(product._id || product.id, quantity);
    setCartItems(mapCartResponse(response.data.cart));
  };

  const removeFromCart = async (productId) => {
    const response = await removeFromCartApi(productId);
    setCartItems(mapCartResponse(response.data.cart));
  };

  const increaseQuantity = async (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    if (!item) return;
    const response = await updateCartItemApi(productId, item.quantity + 1);
    setCartItems(mapCartResponse(response.data.cart));
  };

  const decreaseQuantity = async (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    if (!item) return;
    const newQuantity = Math.max(1, item.quantity - 1);
    const response = await updateCartItemApi(productId, newQuantity);
    setCartItems(mapCartResponse(response.data.cart));
  };

  const clearCart = async () => {
    await Promise.all(cartItems.map((item) => removeFromCartApi(item.id)));
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, refreshCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}