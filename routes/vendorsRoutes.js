const express = require("express");
const router = express.Router();
const vendorsController = require("../controllers/vendorsController");

router.get("/vendors", vendorsController.showVendorlistManager);
router.post("/vendors/add", vendorsController.addVendor);

module.exports = router;