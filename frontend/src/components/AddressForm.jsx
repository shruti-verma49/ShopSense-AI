import { useState } from "react";

function AddressForm({ initialData, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState({
    fullName: initialData?.fullName || "",
    phone: initialData?.phone || "",
    houseNo: initialData?.houseNo || "",
    street: initialData?.street || "",
    landmark: initialData?.landmark || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    pincode: initialData?.pincode || "",
    country: initialData?.country || "India",
    isDefault: initialData?.isDefault || false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!formData.houseNo.trim()) newErrors.houseNo = "House/Flat No. is required";
    if (!formData.street.trim()) newErrors.street = "Street is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }
    if (!formData.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const inputClass = (field) =>
    `w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all duration-200 ${
      errors[field]
        ? "border-red-400 focus:border-red-500"
        : "border-gray-200 dark:border-gray-700 focus:border-[#6D5DF6]"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
          <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Jane Doe" className={`mt-1.5 ${inputClass("fullName")}`} />
          {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="9876543210" className={`mt-1.5 ${inputClass("phone")}`} />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">House/Flat No.</label>
          <input name="houseNo" value={formData.houseNo} onChange={handleChange} placeholder="Flat 4B" className={`mt-1.5 ${inputClass("houseNo")}`} />
          {errors.houseNo && <p className="mt-1 text-xs text-red-500">{errors.houseNo}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Street</label>
          <input name="street" value={formData.street} onChange={handleChange} placeholder="MG Road" className={`mt-1.5 ${inputClass("street")}`} />
          {errors.street && <p className="mt-1 text-xs text-red-500">{errors.street}</p>}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Landmark (optional)</label>
        <input name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Near City Mall" className={`mt-1.5 ${inputClass("landmark")}`} />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
          <input name="city" value={formData.city} onChange={handleChange} placeholder="Raipur" className={`mt-1.5 ${inputClass("city")}`} />
          {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">State</label>
          <input name="state" value={formData.state} onChange={handleChange} placeholder="Chhattisgarh" className={`mt-1.5 ${inputClass("state")}`} />
          {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Pincode</label>
          <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="492001" className={`mt-1.5 ${inputClass("pincode")}`} />
          {errors.pincode && <p className="mt-1 text-xs text-red-500">{errors.pincode}</p>}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
        <input name="country" value={formData.country} onChange={handleChange} placeholder="India" className={`mt-1.5 ${inputClass("country")}`} />
        {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country}</p>}
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
        <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} className="w-4 h-4 rounded accent-[#6D5DF6] cursor-pointer" />
        Set as default address
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-2.5 rounded-xl bg-[#6D5DF6] text-white font-medium hover:bg-[#5b4de0] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : initialData ? "Update Address" : "Save Address"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium hover:border-[#6D5DF6] hover:text-[#6D5DF6] transition-all duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default AddressForm;