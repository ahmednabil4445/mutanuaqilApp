const CarModel = require("./car.model");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
const cloudinary = require("cloudinary");
// Configuration
cloudinary.config({
  cloud_name: "drmdgfwia",
  api_key: "247975922852642",
  api_secret: "VduLlxTqmpkMdAp6oM7Sok3wRds",
});

// to add new Review
exports.addCar = catchAsyncError(async (req, res, next) => {
  cloudinary.v2.uploader.upload(req.file.path, async (error, result) => {
    req.body.carImage = result.secure_url;
    const car = await CarModel.create(req.body)
    res.status(200).json(car)
  })

});


