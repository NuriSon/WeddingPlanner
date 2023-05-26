const mongoose = require("mongoose");
const guestSchema = mongoose.Schema({
    name: String,
    email: String
});
module.exports = mongoose.model("Guest", guestSchema);
