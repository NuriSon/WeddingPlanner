const express = require("express");
const router = express.Router();
const
  userRoutes = require("./userRoutes"),
  errorRoutes = require("./errorRoutes"),
  contactsRoutes = require("./contactsRoutes"),
  guestsRoutes = require("./guestsRoutes"),
  vendorsRoutes = require("./vendorsRoutes"),
  homeRoutes = require("./homeRoutes"),
  apiRoutes = require("./apiRoutes");

// remember that the order matters
router.use("/users", userRoutes);
router.use("/", vendorsRoutes);
router.use("/", contactsRoutes); 
router.use("/", guestsRoutes); 
router.use("/", apiRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes); 

module.exports = router;