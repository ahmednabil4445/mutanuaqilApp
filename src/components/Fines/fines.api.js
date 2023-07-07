const { protectedRoutes } = require("../user/user.service");
const { applyFine, getFineByToken } = require("./fines");

const router = require("express").Router();

// ***********************************
router.post('/',protectedRoutes,applyFine)
// router.get('/getAllSupports',getAllSupports)
router.route("/getFineByToken").get(protectedRoutes,getFineByToken);

module.exports = router;
