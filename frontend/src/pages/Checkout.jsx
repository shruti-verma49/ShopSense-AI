import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MapPin, Plus, Truck, Wallet, CreditCard } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getAddressesApi } from "../services/addressService";
import { createOrderApi } from "../services/orderService";
import AddressCard from "../components/AddressCard";

const DELIVERY_CHARGE_THRESHOLD = 999;
const DELIVERY_CHARGE = 49;
const PLATFORM_FEE = 9;

function getEstimatedDeliveryDate() {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  return date.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
}

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, refreshCart } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const response = await getAddressesApi();
        const fetchedAddresses = response.data.addresses;
        setAddresses(fetchedAddresses);

        const defaultAddress = fetchedAddresses.find((a) => a.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress._id);
        } else if (fetchedAddresses.length > 0) {
          setSelectedAddressId(fetchedAddresses[0]._id);
        }
      } catch (error) {
        toast.error("Could not load addresses");
      } finally {
        setIsLoading(false);
      }
    };

    loadAddresses();
  }, []);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryCharge = subtotal === 0 || subtotal >= DELIVERY_CHARGE_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const platformFee = cartItems.length > 0 ? PLATFORM_FEE : 0;
  const grandTotal = subtotal + deliveryCharge + platformFee;
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const selectedAddress = addresses.find((a) => a._id === selectedAddressId);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsPlacingOrder(true);
    try {
      const orderResponse = await createOrderApi({
        addressId: selectedAddress._id,
        paymentMethod: "COD",
      });

      await refreshCart();
      toast.success("Order placed successfully!");
      navigate("/order-success", { state: { order: orderResponse.data.order } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong while placing your order.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center bg-white dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your cart is empty</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Add some products before checking out.</p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (!isLoading && addresses.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center bg-white dark:bg-gray-900">
        <div className="w-20 h-20 mx-auto rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
          <MapPin size={32} className="text-gray-300 dark:text-gray-600" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Add a delivery address</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">You need at least one saved address to continue with checkout.</p>
        <button
          onClick={() => navigate("/addresses")}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200"
        >
          <Plus size={16} />
          Add Address
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-[70vh] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Checkout</h1>

        <div className="mt-10 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">

            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Delivery Address</h2>
                <Link to="/addresses" className="text-sm text-[#6D5DF6] font-medium hover:underline">
                  Manage Addresses
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                {addresses.map((address) => (
                  <AddressCard
                    key={address._id}
                    address={address}
                    selectable
                    isSelected={selectedAddressId === address._id}
                    onSelect={setSelectedAddressId}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Method</h2>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-[#6D5DF6] bg-[#6D5DF6]/5 p-4">
                  <Wallet size={20} className="text-[#6D5DF6] shrink-0" />
                  <div className="flex-1">
                    <span className="font-medium text-gray-900 dark:text-white">Cash On Delivery</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Pay when your order arrives</p>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-[#6D5DF6] bg-[#6D5DF6] shrink-0" />
                </div>

                <div
                  onClick={() => toast("Online payment is coming soon")}
                  className="flex items-center gap-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4 cursor-not-allowed opacity-60"
                >
                  <CreditCard size={20} className="text-gray-400 shrink-0" />
                  <div className="flex-1">
                    <span className="font-medium text-gray-500 dark:text-gray-400">Online Payment</span>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Card, UPI & more</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-medium shrink-0">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Items in Order</h2>
              <div className="mt-4 space-y-3">
                {cartItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="flex items-center gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6D5DF6] to-[#5B8DEF] flex items-center justify-center shrink-0">
                        <Icon size={22} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">₹{item.price * item.quantity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Order Summary</h2>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                  <span>Delivery Charges</span>
                  <span>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">Grand Total</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">₹{grandTotal}</span>
              </div>

              <div className="mt-4 flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Truck size={14} className="mt-0.5 shrink-0" />
                <span>Estimated delivery by {getEstimatedDeliveryDate()}</span>
              </div>

              {selectedAddress && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Delivering to: </span>
                  {selectedAddress.fullName}, {selectedAddress.city} - {selectedAddress.pincode}
                </div>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="mt-6 w-full py-3 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPlacingOrder ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;