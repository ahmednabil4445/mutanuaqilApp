const fineModel = require("../Fines/fines.model");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");

exports.applyFine = catchAsyncError(async (req, res, next) => {
  const { fine } = req.body;
  const fines = new fineModel({fine, userId: req.id});
  // let total = 0;
  // total += fine;
  // // fines.totalFine=total;
  // console.log(total);
  await fines.save();
  res.status(201).json({ message: "Applied Fines Success !", fines });
});

exports.getFineByToken = catchAsyncError(async (req, res, next) => {
  const userFine = await fineModel.find({ userId: req.id},{userId:0});
  res.status(200).json({ userFine });
});

