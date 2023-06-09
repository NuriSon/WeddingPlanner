const { route } = require("express/lib/application");

const express = require("express"),
	app = express(),
	homeController = require("./controllers/homeController"),
	errorController = require("./controllers/errorController"),
	contactsController = require("./controllers/contactsController"),
	guestsController = require("./controllers/guestsController"),
	usersController = require("./controllers/usersController"),
	layouts = require("express-ejs-layouts"),
	mongoose = require("mongoose"),
	Contact = require("./models/contact"),
	router = express.Router();

app.use("/", router);

mongoose.connect("mongodb+srv://s0579282:hgLKwrCavRkboojX@weddingapp.al8c8xa.mongodb.net/", {
	useNewUrlParser: true,
});

const db = mongoose.connection;

db.once("open", () => {
	console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
	express.urlencoded({
		extended: false,
	})
);
// below is changed (früher is app.)
router.use(express.json());
router.use(layouts);
router.use(express.static("public"));

router.get("/", (req, res) => {
	res.render("index");
});
router.get("/venues", homeController.showVenues);
router.get("/vendors", homeController.showVendors);
router.get("/budget", homeController.showBudgetTracker);
router.get("/guestlist", guestsController.showGuestlistManager);
router.get("/contact", contactsController.showContactPage);
router.post("/contact", contactsController.saveContact);
router.post("/guestlist/add", guestsController.addGuest);
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);

router.get("/contacts", contactsController.getAllContacts, (req, res, next) => {
	console.log(req.data);
	res.render("contacts", { contacts: req.data });
});

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
	console.log(`Server running at http://localhost:${app.get("port")}`);
});
