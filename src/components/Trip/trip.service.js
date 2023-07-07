const tripModel = require("./trip.model");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");

exports.addTrip = catchAsyncError(async (req, res, next) => {
  let trip = await tripModel.insertMany(req.body);
  res.status(200).json({ message: "Success Added Trip ", trip });
});

exports.getAllTrips = catchAsyncError(async (req, res, next) => {
  const currentTime = new Date();
  gt = Math.floor(currentTime / 1000)
  const trips = await tripModel.find({ endTime: { $gte: gt } },{ start: 1, destination: 1, startTime: 1, endTime: 1, price: 1, passengers: 1, stations: 1 });
  res.status(200).json({ trips });
});


exports.getDetailsOfTrip = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const trip = await tripModel.findById(id, { start: 1, destination: 1, startTime: 1, endTime: 1, price: 1, stations: 1, availableSeats: 1 ,driverId:1});
  if (!trip) {
    return next(new AppError("trip not found", 400));
  }
  res.status(200).json(trip);
});


exports.deleteTrip = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let trip = await tripModel.findByIdAndDelete(id);
  if (!trip) {
    return next(new AppError("Trip not found", 400));
  }
  res.status(200).json(trip);
});

exports.deletePassenger = catchAsyncError(async (req, res, next) => {
  let { passengers } = await tripModel.findOneAndUpdate({ userId: req.id }, {
    $pull: { passengers: { _id: req.body.passengerId } }
  }, { new: true });
  !passengers && next(new AppError("trip not found", 400));
  passengers && res.status(200).json(passengers);
});