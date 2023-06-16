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
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  methodOverride = require("method-override");
  expressValidator = require('express-validator');




mongoose.connect(
  "mongodb+srv://s0579282:hgLKwrCavRkboojX@weddingapp.al8c8xa.mongodb.net",
  {
    useNewUrlParser: true,
  }
);

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

app.use("/", router);

router.get("/", (req, res) => {
  res.render("index");
});

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

router.use(cookieParser("pa55c0de"));
router.use(
  expressSession({
    secret: "pa55c0de",
    cookie: {
      maxAge: 4000000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
router.use(connectFlash());

router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});


router.get("/venues", homeController.showVenues);
router.get("/vendors", homeController.showVendors);
router.get("/budget", homeController.showBudgetTracker);
router.get("/guestlist", guestsController.showGuestlistManager);
router.get("/contact", contactsController.showContactPage);
router.post("/contact", contactsController.saveContact);
router.post("/guestlist/add", guestsController.addGuest);
router.get("/signup", usersController.signup);
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate, usersController.redirectView);

router.get("/contacts", contactsController.getAllContacts, (req, res, next) => {
  console.log(req.data);
  res.render("contacts", { contacts: req.data });
});

router.get("/users/new", usersController.new);
router.post("/users/create", usersController.validate, usersController.create, usersController.redirectView);
router.post("/users/create", usersController.create, usersController.redirectView);

router.get("/users/:id/edit", usersController.edit);
router.put(
  "/users/:id/update",
  usersController.update,
  usersController.redirectView
);

router.delete(
  "/users/:id/delete",
  usersController.delete,
  usersController.redirectView
);

router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users", usersController.index, usersController.indexView);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
