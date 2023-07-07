const express = require("express");
const router = express.Router();
const guestsController = require("../controllers/guestsController");

router.get("/guestlist", guestsController.showGuestlistManager);
router.post("/guestlist/add", guestsController.addGuest);

module.exports = router;