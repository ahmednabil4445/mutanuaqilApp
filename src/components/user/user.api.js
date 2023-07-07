
const {  getUsers, deleteUser, register } = require("./user.service");

const router = require("express").Router();

router.route("/register").post(register);
router.route("/getUsers").get(getUsers);
router.route('/deleteUser/:id').delete(deleteUser);

module.exports = router;
