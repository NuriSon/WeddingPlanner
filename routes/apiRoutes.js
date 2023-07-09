const router = require("express").Router(),
  vendorsController = require("../controllers/vendorsController");

router.get("/vendors", vendorsController.showVendorlistManager, vendorsController.respondJSON); 
router.use(vendorsController.errorJSON);

module.exports = router;