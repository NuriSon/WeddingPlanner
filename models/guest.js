const mongoose = require("mongoose");
const guestSchema = mongoose.Schema({
    // Adding validators
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    }
});
module.exports = mongoose.model("Guest", guestSchema);
