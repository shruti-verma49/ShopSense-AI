import { useState, useEffect } from "react";
import { Plus, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { getAddressesApi, addAddressApi, updateAddressApi, deleteAddressApi } from "../services/addressService";
import AddressCard from "../components/AddressCard";
import AddressForm from "../components/AddressForm";

function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadAddresses = async () => {
    setIsLoading(true);
    try {
      const response = await getAddressesApi();
      setAddresses(response.data.addresses);
    } catch (error) {
      toast.error("Could not load addresses");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleAdd = () => {
    setEditingAddress(null);
    setIsFormOpen(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAddressApi(id);
      toast.success("Address deleted");
      loadAddresses();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete address");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await updateAddressApi(id, { isDefault: true });
      toast.success("Default address updated");
      loadAddresses();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update default address");
    }
  };

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingAddress) {
        await updateAddressApi(editingAddress._id, formData);
        toast.success("Address updated");
      } else {
        await addAddressApi(formData);
        toast.success("Address added");
      }
      setIsFormOpen(false);
      setEditingAddress(null);
      loadAddresses();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save address");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-[60vh] transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Addresses</h1>
          {!isFormOpen && (
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200"
            >
              <Plus size={16} />
              Add Address
            </button>
          )}
        </div>

        {isFormOpen && (
          <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </h2>
            <AddressForm
              initialData={editingAddress}
              onSubmit={handleFormSubmit}
              onCancel={() => { setIsFormOpen(false); setEditingAddress(null); }}
              isSubmitting={isSubmitting}
            />
          </div>
        )}

        <div className="mt-8 space-y-4">
          {isLoading ? (
            <p className="text-gray-400 text-sm">Loading addresses...</p>
          ) : addresses.length === 0 && !isFormOpen ? (
            <div className="flex flex-col items-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                <MapPin size={32} className="text-gray-300 dark:text-gray-600" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">No addresses yet</h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-sm">
                Add a delivery address to continue with checkout.
              </p>
            </div>
          ) : (
            addresses.map((address) => (
              <AddressCard
                key={address._id}
                address={address}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSetDefault={handleSetDefault}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Addresses;