const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
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
module.exports = mongoose.model("User", userSchema);
