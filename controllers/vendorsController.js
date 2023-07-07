// This model needs to be defined
const Vendor = require("../models/vendor");

exports.showVendorlistManager = (req, res, next) => {
    Vendor.find({})
        .then(vendors => {
            res.render("vendors", { vendors: vendors });
        })
        .catch(error => {
            console.error("Error retrieving Vendors:", error);
            next(error);
        });
};

exports.addVendor = (req, res) => {
    const newVendor = new Vendor({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        cost: req.body.cost
    });

    newVendor.save()
        .then(() => {
            res.redirect("/vendors");
        })
        .catch(error => {
            res.send(error);
        });
};
