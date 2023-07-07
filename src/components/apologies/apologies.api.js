const { protectedRoutesfordriver } = require("../driver/deiver.services");
const { addApologies, getapologies } = require("./apologies.service");

const router = require("express").Router();
router.route("/addApologies").post(protectedRoutesfordriver,addApologies);
router.get("/",getapologies)
module.exports = router;