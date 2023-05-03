const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

const express = require("express"),
layouts = require("express-ejs-layouts"),
app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));

app.get("/", homeController.showIndex);
app.get("/vendors", homeController.showVendors);
app.get("/contact", homeController.showContact);
app.post("/contact", homeController.submittedContact);

app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});

app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

app.post("/", homeController.showData);

// error handlers as middleware functions
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
    console.log(
        `Server running at http://localhost:${app.get("port")}`
    );
});