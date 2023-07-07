const { protectedRoutes } = require("../user/user.service");
const { AddsupportUser, getAllSupports, getSupportForOneUserByToken } = require("./support");

const router = require("express").Router();

// ***********************************
router.post('/',protectedRoutes,AddsupportUser)
router.get('/getAllSupports',getAllSupports)
router.route("/getSupportForOneUserByToken").get(protectedRoutes,getSupportForOneUserByToken);

module.exports = router;
