const { addCar } = require("./car.service");
const {uploadSingleFile} = require("../../../src/utils/fileUpload");


  const router = require("express").Router();
  
  router.post("/",uploadSingleFile("carImage", "carImage"),addCar)
  
  module.exports = router;
  