const DriverModel = require("./driver.model");
const tripModel = require("../Trip/trip.model");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const driverModel = require("./driver.model");
const userModel = require("../user/user.model");
const { send } = require("../../utils/SendNotification");
const sendPushNotification = require("../../utils/SendNotification");
// **************************Upload Image in Cloudnary************************
const cloudinary = require("cloudinary");
// Configuration
cloudinary.config({
  cloud_name: "drmdgfwia",
  api_key: "247975922852642",
  api_secret: "VduLlxTqmpkMdAp6oM7Sok3wRds",
});
// **************************************************
//Sign Up  for Driver
exports.signup = catchAsyncError(async (req, res, next) => {
  cloudinary.v2.uploader.upload(req.file.path, async (error, result) => {
    const { password, repassword } = req.body;
    if (password !== repassword) {
      return next(new AppError("password not match ", 401));
    }
    const isDriver = await DriverModel.findOne({ email: req.body.email });
    if (isDriver) return next(new AppError("Driver already exists", 401));
    req.body.image = result.secure_url;
    let Driver = new DriverModel(req.body);
    await Driver.save();
    res.status(200).json(Driver);
  });
});

//Sign in  for Driver
exports.signin = catchAsyncError(async (req, res, next) => {
  const Driver = await DriverModel.findOne({ email: req.body.email });
  if (!Driver || !(await bcrypt.compare(req.body.password, Driver.password)))
    return next(new AppError("incorrect email or password", 401));

  let token = jwt.sign({ driverId: Driver._id }, process.env.JWT_KEY);

  res.status(200).json({ token });
});
//get my trip
exports.getAllTripsForDriver = catchAsyncError(async (req, res, next) => {
  const Trips = await tripModel.find({ driverId: req.id });
  res.status(200).json({ Trips });
});
//Get Upcoming Trips For Driver
exports.getAllUpcomingTripsForDriver = catchAsyncError(
  async (req, res, next) => {
    const currentTime = new Date();
    gt = Math.floor(currentTime / 1000);
    const trips = await tripModel.find({
      driverId: req.id,
      endTime: { $gte: gt },
      isDone: false,
    });
    res.status(200).json({ trips });
  }
);
//Get Pervious Trips For Driver
exports.getAllPerviousTripsForDriver = catchAsyncError(
  async (req, res, next) => {
    const currentTime = new Date();
    lt = Math.floor(currentTime / 1000);
    const trips = await tripModel.find({
      driverId: req.id,
      endTime: { $lt: lt },
      isDone: true,
    });
    res.status(200).json({ trips });
  }
);
//get trip by id
exports.Trip = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const trip = await tripModel.findById(id, {
    start: 1,
    destination: 1,
    startTime: 1,
    endTime: 1,
    price: 1,
    stations: 1,
    passengers: 1,
  });
  if (!trip) {
    return next(new AppError("trip not found", 400));
  }
  res.status(200).json(trip);
});
///update isDone
exports.upDateTrip = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const Id = req.id;
  let trip = await tripModel.findByIdAndUpdate(id, { isDone: true });

  if (!trip) {
    return next(new AppError("Trip not found", 400));
  } else {
    const data = {
      type: "rateDriver",
      driverId: Id,
      tripId: id,
    };
    const objs = trip.passengers.filter((item) => item.HasCome == 1);
let totalPrice=0
    for (let index = 0; index < objs.length; index++) {
      const myPrice=objs[index].passengerPrice
      
      totalPrice+=myPrice
      const element = objs[index].fcmToken;
      sendPushNotification(element, data);
    }
console.log(totalPrice);
    const driver = await DriverModel.findByIdAndUpdate(Id,{balance:totalPrice});

    res.status(200).json({ message: "trip is done", driver });
  }
});
//تاكيد وصول عدم الراكب
exports.PassengerDidNotShowUp = catchAsyncError(async (req, res, next) => {
  const { id, ticket } = req.params;
  const num = parseInt(ticket);
  let trip = await tripModel.findById(id);
  if (!trip) {
    return next(new AppError("trip not found", 400));
  } else {
    let obj = trip.passengers.find((item) => item.ticket === num);
    obj.HasCome = -1;
    trip.save();
    res.json({ message: "The passenger did not show up", obj });
  }
});
// تاكيد وصول الراكب
exports.PassengerShowedUp = catchAsyncError(async (req, res, next) => {
  const { id, ticket } = req.params;
  const num = parseInt(ticket);
  let trip = await tripModel.findById(id);
  if (!trip) {
    return next(new AppError("trip not found", 400));
  } else {
    let obj = trip.passengers.find((item) => item.ticket === num);
    //  console.log(obj);
    obj.HasCome = 1;
    trip.save();
    res.json({ message: "The passenger showed up", trip });
  }
});
exports.protectedRoutesfordriver = catchAsyncError(async (req, res, next) => {
  let token = req.headers.token;
  if (!token) return next(new AppError("Token Not Provided", 401));
  let decoded = await jwt.verify(token, process.env.JWT_KEY);
  let driver = await driverModel.findById(decoded.driverId);
  if (!driver) {
    return next(new AppError("Driver Not Found", 401));
  } else {
    req.id = decoded.driverId;
    next();
  }
});
//تاكيد وصول الركاب الى وجهتهم

exports.passengerArrived = catchAsyncError(async (req, res, next) => {
  const { id, ticket } = req.params;
  const num = parseInt(ticket);
  let trip = await tripModel.findById(id);
  if (!trip) {
    return next(new AppError("trip not found", 404));
  } else {
    if (trip.passengers.length == 0) {
      return next(new AppError("passenger not found", 404));
    } else {
      let obj = trip.passengers.find((item) => item.ticket === num);

      obj.isArrived = true;
      trip.save();
      res.json({ message: "The passenger had arrived to distnation", obj });
    }
  }

  // get passenger and updatestation
});
exports.passenger = catchAsyncError(async (req, res, next) => {
  const { id, index } = req.params;
  const trip = await tripModel.findById(id);
  trip.stations[index].isArrived = true;
  const station = trip.stations[index];
  const passengers = trip.passengers;

  trip.save();

  if (trip.passengers.length == 0) {
    res.json({ passengers });
  } else {
    const data = {
      type: "driverArrival",
    };

    const passengerStation = passengers.filter(
      (passenger) => passenger.point === Number(index)
    );
    const passengerHasArrived = passengerStation.filter(
      (key) => key.HasCome === 1
    );
    passengerHasArrived.map((i) => {
      const fcmtoken =i.fcmToken
      sendPushNotification(fcmtoken, data);
    });

    res.json({ message: station, passengers });
  }
});
// get driver by id
exports.Driver = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const Driver = await DriverModel.findById(id, { password: 0 }).populate(
    "car",
    {
      carImage: 1,
      carName: 1,
      carNumber: 1,
    }
  );
  if (!Driver) {
    return next(new AppError("Driver not found", 400));
  }
  res.status(200).json(Driver);
});
// get driver by token
exports.DriverByToken = catchAsyncError(async (req, res, next) => {
  const id = req.id;
  console.log(id);
  const Driver = await DriverModel.findById(id, { password: 0 });
  if (!Driver) {
    return next(new AppError("Driver not found", 400));
  }
  res.status(200).json(Driver);
});
exports.Drivers = catchAsyncError(async (req, res, next) => {
  const Drivers = await DriverModel.find({});
  if (!Drivers) {
    return next(new AppError("Driver not found", 400));
  }
  res.status(200).json(Drivers);
});

exports.upDateBalance = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const Driver = await DriverModel.findByIdAndUpdate(
    id,
    { balance: 0 },
    { new: true }
  );
  if (!Driver) {
    return next(new AppError("Driver not found", 400));
  }
  res.status(200).json(Driver);
});
exports.passengerprice = catchAsyncError(async (req, res, next) => {
  const { id, ticket } = req.params;
  const num = parseInt(ticket);
  let trip = await tripModel.findById(id);
  if (!trip) {
    return next(new AppError("trip not found", 404));
  } else {
    if (trip.passengers.length == 0) {
      return next(new AppError("passenger not found", 404));
    } else {
      let obj = trip.passengers.find((item) => item.ticket === num);
      if (trip.forcePrice === 1) {
        const totalPrice = obj.numOfSeat * trip.price;
        obj.passengerPrice = totalPrice;
      } else {
        const FristPoint = obj.point + 1;
        let myprice = 0;
        for (let i = FristPoint; trip.stations[i].isArrived == true; i++) {
          myprice += trip.stations[i].stationPrice;
        }
  
        const totalPrice = obj.numOfSeat * myprice;
        obj.passengerPrice = totalPrice;
      }

      trip.save();
      res.json(obj);
    }
  }
});
