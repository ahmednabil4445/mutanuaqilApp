
const { signup, signin, getAllTripsForDriver, Trip, upDateTrip, protectedRoutesfordriver, passenger, Driver, PassengerDidNotShowUp, PassengerShowedUp, passengerArrived, previousTrips, Drivers, getAllUpcomingTripsForDriver, getAllPerviousTripsForDriver, upDateBalance, DriverByToken, passengerprice} = require("./deiver.services");
const {uploadSingleFile} = require("../../../src/utils/fileUpload");
  const router = require("express").Router();
  
  router.post('/signup',uploadSingleFile("image", "driverImage"), signup)
  router.post('/signin', signin)
  router.route("/getAllTripsForDriver").get(protectedRoutesfordriver,getAllTripsForDriver);
  router.route("/trip/:id").get(protectedRoutesfordriver,Trip);
  router.patch('/trip/:id',protectedRoutesfordriver,upDateTrip)
  router.patch('/UpDateBalance/:id',upDateBalance)
  router.get('/passenger/DidNotshowedUp/:id/:ticket',protectedRoutesfordriver,PassengerDidNotShowUp)
  router.get('/passenger/showUp/:id/:ticket',protectedRoutesfordriver,PassengerShowedUp)
  router.get('/passenger/:id/:ticket',protectedRoutesfordriver,passengerArrived)
  router.get('/passengerprice/:id/:ticket',passengerprice)
  router.get('/station/:id/:index',passenger)
  router.route("/getAllUpcomingTripsForDriver").get(protectedRoutesfordriver,getAllUpcomingTripsForDriver);
  router.route("/getAllPerviousTripsForDriver").get(protectedRoutesfordriver,getAllPerviousTripsForDriver);
  router.get('/',Drivers)
  router.route("/DriverByToken").get(protectedRoutesfordriver,DriverByToken);
  router.get('/:id',Driver)

  module.exports = router;