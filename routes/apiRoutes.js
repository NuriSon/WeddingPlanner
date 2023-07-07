const router = require("express").Router();
const usersController = require("../controllers/usersController");

router.use(usersController.verifyToken);

module.exports = router;