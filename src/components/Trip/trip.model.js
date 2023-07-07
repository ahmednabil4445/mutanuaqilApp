const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");

const schema = Schema(
  {
    start: {
      type: String,
      // required: [true, "Start Trip Is Required"],
      trim: true,
      minlength: [2, "Too Short Start Trip"],
    },
    startTime: Number,
    endTime: Number,

    price: Number,
    forcePrice:{type:Number,
    default:0},
    destination: {
      type: String,
      // required: [true, "Destination Trip Is Required"],
      minlength: [2, "Too Short Destination"],
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    availableSeats: {
      type: Number,
      default: 14,
    },
    driverId: {
      type: Types.ObjectId,
      ref: "driver",
    },
    driverLocation: {
      lat: Number,
      lng: Number,
    },
    userId: {
      type: Types.ObjectId,
      ref: "user",
    },
    stations: [
      {
        name: String,
        location: {
          lat: Number,
          lng: Number,
        },
        stationPrice:{
          type:Number,
          default:0,
        },
        isArrived: {
          type: Boolean,
          default: false,
        },
        time: {
          type: Number,
        },
      },
    ],
    passengers: [
      {
        name: String,
        hasPaid: {
          type: Boolean,
          default: false,
        },
        isArrived: {
          type: Boolean,
          default: false,
        },
        numOfSeat: Number,
        point: Number,
        HasCome: {
          type: Number,
          default: 0,
        },
        ticket:Number,
        fcmToken:String,
        passengerPrice:{
          type:Number,
          default:0,
        },
      },
      
    ],
  },
  { timestamps: true }
);
// schema.pre('find',function(){
//   this.populate('driver','name')
// })
module.exports = model("trip", schema);
