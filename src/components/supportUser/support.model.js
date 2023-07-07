const { Schema, model, Types } = require("mongoose");

const schema = Schema(
  {
    message: {
      type: String,
      required: [true, "Message Is Required"],
      trim: true,
      minlength: [2, "Too Short Message"],
    },
    date: Number,
    userId: {
      type: Types.ObjectId,
      ref: "user",
    },
  },
  // { timestamps: true }
);
module.exports = model("support", schema);
