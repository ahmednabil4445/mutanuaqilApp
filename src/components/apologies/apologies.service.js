const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
const apologiesModel = require("./apologies.model");

exports.addApologies = catchAsyncError(async (req, res, next) => {
    const {message, tripId } = req.body;
    const driverId = req.id;
    console.log(driverId);
    let isapologies = await apologiesModel.findOne({tripId  })
   if  (isapologies) {
    return next(new AppError('your are created a apologies before'))
   } else {
    let apologies = new apologiesModel({message,driverId,tripId});
    await apologies.save();
    res.status(200).json({message:" sucess watting for calling you"});
   }
});
exports.getapologies = catchAsyncError(async (req, res,next) => {
    let isApologies = await apologiesModel.find({});
    res.status(200).json({isApologies});
});
