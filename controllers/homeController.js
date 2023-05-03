exports.showIndex = (req, res) => {
    res.render("index");
}

exports.showContact = (req, res) => {
    res.render("contact");
};

// page after user submitted a contact form
exports.submittedContact = (req, res) => {
    res.render("thanks");
};

exports.showData = (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST Successful!");
};

var vendorList = [
    {
        title: "Park",
        cost: 10
    },
    {
        title: "Hotel",
        cost: 30
    },
    {
        title: "Restaurant",
        cost: 20
    }
];

exports.showVendors = (req, res) => {
    res.render("vendors", {
        offeredVendors: vendorList
    });
};