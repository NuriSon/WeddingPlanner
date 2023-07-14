const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", (req, res) => {
    res.render("index", { title: "home" });
});
router.get("/venues", homeController.showVenues);
//router.get("/vendors", homeController.showVendors);
router.get("/budget", homeController.showBudgetTracker);
router.get("/chat", homeController.chat);

module.exports = router;