
const UserModel = require("./user.model");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const userModel = require("./user.model");

exports.register = catchAsyncError(async (req, res, next) => {
let Usermodel = new UserModel(req.body);
const User = await UserModel.findOne({ phone: req.body.phone  })
  if (!User) {
    let token = jwt.sign(
      { name: Usermodel.name, userId: Usermodel._id },
      process.env.JWT_KEY
    );
    await Usermodel.save();
    res.status(200).json({ token });
  } else {
    let token = jwt.sign(
      { name: Usermodel.name, userId: User._id},
      process.env.JWT_KEY
    );
    res.status(200).json({token:token});
  }
});


exports.getUsers = catchAsyncError(async (req, res) => {
  let Users = await UserModel.find({});
  res.status(200).json(Users);
});


exports.protectedRoutes = catchAsyncError(async (req, res,next) => {
  let token = req.headers.token;
  if(!token) return next(new AppError('Token Not Provided',401));
  let decoded =await jwt.verify(token, process.env.JWT_KEY);
  let user = await userModel.findById(decoded.userId);
  if(!user){
   next(new AppError('User Not Found',401));
  }else{
    req.id=decoded.userId;
    next()
  }
});

exports.deleteUser = catchAsyncError(async (req, res,next) => {
  const { id } = req.params;
  let user = await UserModel.findByIdAndDelete(id);
  if (!user) {
    return next(new AppError("user not found", 400));
  }
  res.status(200).json(user);
});
