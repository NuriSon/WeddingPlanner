const mongoose = require("mongoose"),
  { Schema } = mongoose,
  userSchema = new Schema(
    {
      name: {
        first: {
          type: String,
          trim: true,
        },
        last: {
          type: String,
          trim: true,
        },
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999,
      },
      password: {
        type: String,
        required: true,
      },
      courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
      subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" },
    },
    {
      timestamps: true,
    }
  );
const Guest = require("./guest");
userSchema.pre("save", function (next) {
  let user = this;
  if (user.guestAccount === undefined) {
    Guest.findOne({
      email: user.email,
    })
      .then((guest) => {
        user.guestAccount = guest;
        next();
      })
      .catch((error) => {
        console.log(`Error in connecting subscriber:
		 ${error.message}`);
        next(error);
      });
  } else {
    next();
  }
});
userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

module.exports = mongoose.model("User", userSchema);
