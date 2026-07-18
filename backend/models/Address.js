const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: [true, "Full name is required"], trim: true },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"],
    },
    houseNo: { type: String, required: [true, "House/Flat No. is required"], trim: true },
    street: { type: String, required: [true, "Street is required"], trim: true },
    landmark: { type: String, trim: true, default: "" },
    city: { type: String, required: [true, "City is required"], trim: true },
    state: { type: String, required: [true, "State is required"], trim: true },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      match: [/^[0-9]{6}$/, "Pincode must be exactly 6 digits"],
    },
    country: { type: String, required: [true, "Country is required"], trim: true, default: "India" },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);