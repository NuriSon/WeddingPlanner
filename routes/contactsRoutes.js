const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contactsController");

router.get("/contact", contactsController.showContactPage);
router.post("/contact", contactsController.saveContact);
router.get("/contacts", contactsController.getAllContacts, (req, res, next) => {
	console.log(req.data);
	res.render("contacts", { contacts: req.data });
});

module.exports = router;