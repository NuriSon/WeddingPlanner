// This model needs to be defined
const Guest = require("../models/guest");

exports.showGuestlistManager = (req, res, next) => {
    Guest.find({})
        .then(guests => {
            res.render("guestlist", { guests: guests });
        })
        .catch(error => {
            console.error("Error retrieving guests:", error);
            next(error);
        });
};

exports.addGuest = (req, res) => {
    const newGuest = new Guest({
        name: req.body.name,
        email: req.body.email
    });

    newGuest.save()
        .then(() => {
            res.redirect("/guestlist");
        })
        .catch(error => {
            res.send(error);
        });
};
