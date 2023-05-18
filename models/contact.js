const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
    name: String,
    email: String
});
module.exports = mongoose.model("Contact", contactSchema);