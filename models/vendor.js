const mongoose = require("mongoose");
const vendorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: [String],
        required: true
    },
    cost: {
        type: Number,
        required: true
    }
});

vendorSchema.methods.getInfo = function() {
    return `Vendor: ${this.name} | Type: ${this.type}`;
};

module.exports = mongoose.model("Vendor", vendorSchema);
