const Address = require("../models/Address");

const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.userId }).sort({ isDefault: -1, createdAt: -1 });
    return res.status(200).json({ success: true, count: addresses.length, addresses });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong while fetching addresses", error: error.message });
  }
};

const addAddress = async (req, res) => {
  try {
    const { fullName, phone, houseNo, street, landmark, city, state, pincode, country, isDefault } = req.body;

    if (!fullName || !phone || !houseNo || !street || !city || !state || !pincode || !country) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ success: false, message: "Phone number must be exactly 10 digits" });
    }
    if (!/^[0-9]{6}$/.test(pincode)) {
      return res.status(400).json({ success: false, message: "Pincode must be exactly 6 digits" });
    }

    const existingCount = await Address.countDocuments({ user: req.user.userId });
    const shouldBeDefault = existingCount === 0 ? true : !!isDefault;

    if (shouldBeDefault) {
      await Address.updateMany({ user: req.user.userId }, { isDefault: false });
    }

    const newAddress = await Address.create({
      user: req.user.userId,
      fullName,
      phone,
      houseNo,
      street,
      landmark: landmark || "",
      city,
      state,
      pincode,
      country,
      isDefault: shouldBeDefault,
    });

    return res.status(201).json({ success: true, message: "Address added successfully", address: newAddress });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Something went wrong while adding the address", error: error.message });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findById(id);

    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }
    if (address.user.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "Not authorized to modify this address" });
    }

    const { fullName, phone, houseNo, street, landmark, city, state, pincode, country, isDefault } = req.body;

    if (phone && !/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ success: false, message: "Phone number must be exactly 10 digits" });
    }
    if (pincode && !/^[0-9]{6}$/.test(pincode)) {
      return res.status(400).json({ success: false, message: "Pincode must be exactly 6 digits" });
    }

    if (isDefault === true) {
      await Address.updateMany({ user: req.user.userId }, { isDefault: false });
    }

    if (fullName !== undefined) address.fullName = fullName;
    if (phone !== undefined) address.phone = phone;
    if (houseNo !== undefined) address.houseNo = houseNo;
    if (street !== undefined) address.street = street;
    if (landmark !== undefined) address.landmark = landmark;
    if (city !== undefined) address.city = city;
    if (state !== undefined) address.state = state;
    if (pincode !== undefined) address.pincode = pincode;
    if (country !== undefined) address.country = country;
    if (isDefault !== undefined) address.isDefault = isDefault;

    await address.save();

    return res.status(200).json({ success: true, message: "Address updated successfully", address });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid address ID format" });
    }
    return res.status(500).json({ success: false, message: "Something went wrong while updating the address", error: error.message });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findById(id);

    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }
    if (address.user.toString() !== req.user.userId) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this address" });
    }

    const wasDefault = address.isDefault;
    await address.deleteOne();

    if (wasDefault) {
      const nextAddress = await Address.findOne({ user: req.user.userId }).sort({ createdAt: -1 });
      if (nextAddress) {
        nextAddress.isDefault = true;
        await nextAddress.save();
      }
    }

    return res.status(200).json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ success: false, message: "Invalid address ID format" });
    }
    return res.status(500).json({ success: false, message: "Something went wrong while deleting the address", error: error.message });
  }
};

module.exports = { getAddresses, addAddress, updateAddress, deleteAddress };