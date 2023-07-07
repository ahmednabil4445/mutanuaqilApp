const flightTrip = require("./flightTrip.model");
const tripModel = require("../Trip/trip.model");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
var jwt = require("jsonwebtoken");
const flightTripModel = require("./flightTrip.model");

exports.flightTrip = catchAsyncError(async (req, res, next) => {
  const { numOfSeat, point, tripId, state, date, start, startTime, name, endTime, price, destination,fcmToken } = req.body;
  const trip = await tripModel.findById(tripId);
// console.log(req.body);

  if (!trip) {
    next(new AppError("trip not found", 404));
    return;
  }
  if (numOfSeat > 2) {
    next(new AppError("numOfSeat Must Be Less than Or Equal 2 Seats", 404));
    return;
  }
  const min = 500; // minimum value (inclusive)
  const max = 10; // maximum value (inclusive)

  // Create a set to store used numbers
  const usedNumbers = new Set();

  // Generate a random unique number within the range
  function generateUniqueNumber() {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (usedNumbers.has(randomNumber));
    usedNumbers.add(randomNumber);
    return randomNumber;
  }

  const flight = new flightTrip({ fcmToken,numOfSeat, point, tripId, name, date, start, startTime, endTime, price, destination, state ,userId: req.id,ticket: generateUniqueNumber() });
  const isflight = await flightTrip.findOne({ tripId: req.body.tripId, userId: req.id })
  if (isflight) return next(new AppError("Trip Already Booked", 401));
  trip.passengers.push(flight)
  await trip.save();
  await flight.save();
  res.status(201).json({ message: "Flight booked successfully!", flight });
});


exports.getAllFlightTrips = catchAsyncError(async (req, res, next) => {
  const FlightTrips = await flightTrip.find({});
  res.status(200).json({ FlightTrips });
});

exports.getFlightTripsByToken = catchAsyncError(async (req, res, next) => {
  const FlightTrips = await flightTrip.find({ userId: req.id });
  res.status(200).json({ FlightTrips });
});

exports.cancelFlightTrip = catchAsyncError(async (req, res, next) => {

  const { id } = req.params;
  const { startTime } = req.body;
  const currentTime = new Date();

  if (startTime - Math.floor(currentTime / 1000) > 10800) {
    let Flight = await flightTrip.findByIdAndUpdate(id, { state: -1 }, { new: true });
    let { passengers } = await tripModel.findOneAndUpdate({ userId: req._id }, {
     
      $pull: { passengers: { _id: Flight._id } }
    }, { new: true });
    !passengers && next(new AppError("trip not found", 400));
    if (!Flight) {
      return next(new AppError("Flight not found", 400));
    }
    res.status(200).json({ message: "Trip Cancel Success" });
  } else {
    let Flight = await flightTrip.findByIdAndUpdate(id, { state: 0 }, { new: true });
    if (!Flight) {
      return next(new AppError("Flight not found", 400));
    }
    res.status(200).json({ message: "Trip Not Cancel" });
  }
});


// exports.deletePassenger = catchAsyncError(async (req, res, next) => {
//   const { tripId, point } = req.params;
//   const trip = await tripModel.findById(tripId);
//   console.log(trip.passengers);
//   if (!trip) {
//     res.status(404).json({ error: 'Trip not found.' });
//   } else {
//     trip.passengers = trip.passengers.filter(passenger => passenger !== point);
//     await trip.save();
//     res.json({ message: 'Trip deleted successfully!' });
//   }
// });
























// exports.upcomingFlight = catchAsyncError(async (req, res, next) => {
//   if (endTime>start) {
//     const upcomingFlights = await flightTrip.find({});
//     res.json(upcomingFlights);
//     return;
//   }
// });


// exports.upcomingFlight = catchAsyncError(async (req, res, next) => {
//   let { endTime, start } = req.header('endTime','start');
//   if (endTime > start) {
//     const upcomingFlights = await flightTrip.find({});
//     res.json(upcomingFlights);
//   }
// });

// exports.pastFlights = catchAsyncError(async (req, res, next) => {
//   const today = new Date().toISOString().split('T')[0];
//   const pastFlights = await flightTrip.find({ date: { $lt: today } }).populate({ path: 'Trip', select: ['start','destination','startTime','endTime','price'] });
//   res.json(pastFlights);
// });
