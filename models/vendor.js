const mongoose = require("mongoose");
const vendorSchema = new mongoose.Schema({
  vendorName: {
    name: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  items: [],
  zipCode: {
    type: Number,
    min: [10000, "Zip code too short"],
    max: 99999,
  },
});
module.exports = mongoose.model("Vendor", vendorSchema);
