// This model needs to be defined
const User = require("../models/user");

exports.showUserlistManager = (req, res, next) => {
  User.find({})
        .then(users => {
            res.render("userlist", { users: users});
        })
        .catch(error => {
            console.error("Error retrieving users:", error);
            next(error);
        });
};

exports.addUser = (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email
    });

    newUser.save()
        .then(() => {
            res.redirect("/userlist");
        })
        .catch(error => {
            res.send(error);
        });
};
