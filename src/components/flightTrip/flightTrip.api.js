const { auth } = require("../user/auth");
const { protectedRoutes } = require("../user/user.service");
const { flightTrip,  getAllFlightTrips, getFlightTripsByToken, cancelFlightTrip, deletePassenger } = require("./flightTrip.service");

const router = require("express").Router();

// ***********************************
// router.post('/bookTrip',auth,bookTrip)
router.post('/',protectedRoutes,flightTrip)
router.get('/getAllFlightTrips',getAllFlightTrips)
// router.get('/getFlightTripsByToken/:token',getFlightTripsByToken)
router.route("/getFlightTripsByToken").get(protectedRoutes,getFlightTripsByToken);
router.route("/cancelFlightTrip/:id").put(cancelFlightTrip);

// router.delete('/deletePassenger/:tripId/:point',deletePassenger)

// router.get('/pastFlights',pastFlights)

module.exports = router;
