const { Schema, model, Types } = require("mongoose");
const schema = Schema(
  {
    message: {
      type: String,
      required: [true, "review name required"],
      trim: true,
      minlength: [1, "too short review name"],
    },
    user: {
      type: Types.ObjectId,
      ref: "user",
    },
    driver: {
      type: Types.ObjectId,
      ref: "driver",
    },
    ratingAverage: {
      type: Number,
      min: [1, "ratingAverage must be greater than 1"],
      max: [5, "ratingAverage must be less than 5"],
    },
  },
  { timestamps: true }
);

schema.pre(/^find/, function (next) {
  this.populate('user', 'name')

  next()
})
module.exports = model("review", schema);
