const User = require("../models/user");
const { check, validationResult } = require('express-validator');

module.exports = {
  index: (req, res, next) => {
    User.find({})
      .then((users) => {
        res.locals.users = users;
        next();
      })
      .catch((error) => {
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("users/index");
  },
  new: (req, res) => {
    res.render("users/new");
  },
  validate: [
    check("email").notEmpty().withMessage('Email cannot be empty').normalizeEmail().isEmail().withMessage("Email is invalid"),
    check("zipCode").notEmpty().isInt().isLength({ min: 5, max: 5 }).withMessage("Zip code is invalid"),
    check("password").notEmpty().withMessage("Password cannot be empty"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let messages = errors.array().map(e => e.msg);
        req.skip = true;
        req.flash("error", messages.join(" and "));
        res.locals.redirect = "/users/new";
        next();
      } else {
        next();
      }
    }
  ],
  create: (req, res, next) => {
    let userParams = {
      name: {
        first: req.body.first,
        last: req.body.last,
      },
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode,
    };
    User.create(userParams)
      .then((user) => {
        req.flash("success", `${user.fullName}'s account created successfully!`);
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error saving user: ${error.message}`);
        res.locals.redirect = "/users/new";
        req.flash(
          "error",
          `Failed to create user account because: ➥${error.message}.`
        );
        next();
      });
  },
  signup: (req, res) => {
    res.render("users/new");
  },

  login: (req, res) => {
    res.render("users/login");
  },
  authenticate: (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          user.passwordComparison(req.body.password).then(passwordsMatch => {
            if (passwordsMatch) {
              res.locals.redirect = `/users/${user._id}`;
              req.flash("success", `${user.fullName}'s logged in successfully!`);
              res.locals.user = user;
            } else {
              req.flash("error", "Failed to log in user account: Incorrect Password.");
              res.locals.redirect = "/users/login";
            }
            next();
          });
        } else {
          req.flash("error", "Failed to log in user account: User account not found.");
          res.locals.redirect = "/users/login";
          next();
        }
      })
      .catch(error => {
        console.log(`Error logging in user: ${error.message}`);
        next(error);
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then((user) => {
        if (user) {
          res.locals.user = user;
          next();
        } else {
          req.flash("error", "User not found");
          res.redirect("/users/login");
        }
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },

  showView: (req, res) => {
    res.render("users/show");
  },
  edit: (req, res, next) => {
    let userId = req.params.id;
    User.findById(userId)
      .then((user) => {
        res.render("users/edit", {
          user: user,
        });
      })
      .catch((error) => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  update: (req, res, next) => {
    let userId = req.params.id,
      userParams = {
        name: {
          first: req.body.first,
          last: req.body.last,
        },
        email: req.body.email,
        password: req.body.password,
        zipCode: req.body.zipCode,
      };
    User.findByIdAndUpdate(userId, {
      $set: userParams,
    })
      .then((user) => {
        req.flash("success", `${user.fullName}'s account updated successfully!`);
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch((error) => {
        console.log(`Error updating user by ID: ${error.message}`);
        req.flash(
          "error",
          `Failed to update user account because: ${error.message}.`
        );
        next();
      });
  },
  delete: (req, res, next) => {
    let userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(() => {
        req.flash("success", `User's account deleted successfully!`);
        res.locals.redirect = "/users";
        next();
      })
      .catch((error) => {
        console.log(`Error deleting user by ID: ${error.message}`);
        req.flash(
          "error",
          `Failed to delete user account because: ${error.message}.`
        );
        next();
      });
  },
};
