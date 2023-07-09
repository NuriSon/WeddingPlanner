// This model needs to be defined
const Vendor = require("../models/vendor");

module.exports = {
    showVendorlistManager: (req, res, next) => {
        Vendor.find({})
            .then(vendors => {
                if (req.query.format === "json") {
                    res.json(vendors);
                } else {
                    res.render("vendors", { vendors: vendors });
                }
            })
            .catch(error => {
                console.error("Error retrieving Vendors:", error);
                next(error);
            });
    },
    addVendor: (req, res) => {
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
    },
    respondJSON: (req, res) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    },
    errorJSON: (error, req, res, next) => {
        let errorObject;
        if (error) {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            };
        } else {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: "Unknown Error."
            };
        }
        res.json(errorObject);
    },
}
