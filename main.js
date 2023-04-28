const homeController = require("./controllers/homeController");

const port = 3000,
express = require("express"),
app = express();

app.get("/", homeController.sendIndex);
app.get("/services/:vendors", homeController.sendReqVendors);

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

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});