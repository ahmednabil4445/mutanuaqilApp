
const { auth } = require("../user/auth");
const { addTrip, getAllTrips ,getDetailsOfTrip, deleteTrip, deletePassenger} = require("./trip.service");

const router = require("express").Router();

// ***********************************
router.route("/addTrip").post(addTrip);
// router.route("/bookTrip/:id").post(bookTrip);
// router.route("/addTrip").post(uploadSingleFile([{name:'image',maxCount:1}],'userImage'),addTrip);
router.route("/getAllTrips").get(getAllTrips);
router.route("/getDetailsOfTrip/:id").get(getDetailsOfTrip);
router.route('/deleteTrip/:id').delete(deleteTrip);
router.route('/deletePassenger').delete(deletePassenger);
module.exports = router;
