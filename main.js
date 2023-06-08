const express = require("express"),
	app = express(),
	homeController = require("./controllers/homeController"),
	errorController = require("./controllers/errorController"),
	contactsController = require("./controllers/contactsController"),
	guestsController = require("./controllers/guestsController"),
	usersController = require("./controllers/usersController"),
	layouts = require("express-ejs-layouts"),
	mongoose = require("mongoose"),
	Contact = require("./models/contact");

mongoose.connect("mongodb://localhost:27017/wedding_db", {
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
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/venues", homeController.showVenues);
app.get("/vendors", homeController.showVendors);
app.get("/budget", homeController.showBudgetTracker);
app.get("/guestlist", guestsController.showGuestlistManager);
app.get("/contact", contactsController.showContactPage);
app.post("/contact", contactsController.saveContact);
app.post("/guestlist/add", guestsController.addGuest);
app.get("/users", usersController.index, usersController.indexView);

app.get("/contacts", contactsController.getAllContacts, (req, res, next) => {
	console.log(req.data);
	res.render("contacts", { contacts: req.data });
});

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
	console.log(`Server running at http://localhost:${app.get("port")}`);
});
