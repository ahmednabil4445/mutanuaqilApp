const { Schema, model, Types } = require("mongoose");

const schema = Schema(
  {
    fine: {
      type: Number,
      required: [true, "Fine Is Required"],
    },
    totalFine:Number,
    userId: {
      type: Types.ObjectId,
      ref: "user",
    },
  },
  // { timestamps: true }
);
module.exports = model("fine", schema);
