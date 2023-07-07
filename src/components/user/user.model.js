const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");

const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "user name required"],
      trim: true,
      minlength: [2, "too short user name"],
    },
    phone:{
      type: String,
      required: [true, "phone required"],
      minlength: [11, "too short user phone"],
     
    },
   

  },
  { timestamps: true }
);

module.exports = model("user", schema);
