const supportModel = require("../supportUser/support.model");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");

exports.AddsupportUser = catchAsyncError(async (req, res, next) => {
  const { message, date } = req.body;
  const support = new supportModel({ message, date , userId: req.id });
  await support.save();
  res.status(201).json({ message: "Support Is OK !", support });
});


exports.getAllSupports = catchAsyncError(async (req, res, next) => {
  const supports = await supportModel.find({},{userId:0});
  res.status(200).json({ supports });
});

exports.getSupportForOneUserByToken = catchAsyncError(async (req, res, next) => {
  const support = await supportModel.find({ userId: req.id },{userId:0});
  res.status(200).json({ support });
});

