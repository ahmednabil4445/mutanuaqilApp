const { Schema, model, Types } = require("mongoose");

const schema = Schema(
  {
    tripId: {
      type: Types.ObjectId,
      ref: "trip",
    },
    userId: {
      type: Types.ObjectId,
      ref: "user",
    },
    date: Number,
    numOfSeat: Number,
    point: Number,
    start: {
      type: String,
      trim: true,
      minlength: [2, "Too Short Start Trip"],
    },
    startTime: Number,
    endTime: Number,
    price: Number,
    destination: {
      type: String,
      minlength: [2, "Too Short Destination"],
    },
    state: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      required: [true, "user name required"],
      trim: true,
      minlength: [2, "too short user name"],
    },
    HasCome: {
      type: Number,
      default: 0,
    },
    passengerPrice:{
      type:Number,
      default:0},
    ticket:Number,
    fcmToken:String,
  },
  { timestamps: true }
);
module.exports = model("flight", schema);
