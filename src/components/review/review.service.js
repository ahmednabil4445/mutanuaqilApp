const ReviewModel = require("./reviews.model");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");
const factory = require("../Handlers/handler.factory");

// to add new Review
exports.createReview = catchAsyncError(async (req, res, next) => {
  const { ratingAverage, message, driver } = req.body;
  const user = req.id;
  let isReview = await ReviewModel.findOne({
    user: req.id,
    driver: req.body.driver,
  });
  if (isReview) return next(new AppError("your are created a review before"));
  let Review = new ReviewModel({ ratingAverage, message, driver, user });
  await Review.save();
  res.status(200).json(Review);
});

// to get all Reviews
exports.getReviews = catchAsyncError(async (req, res) => {
  let Ratings = await ReviewModel.find({});
  res.status(200).json({Ratings});
});

// to get specific Review
exports.getReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let Ratings = await ReviewModel.findById(id);
  Ratings && res.status(200).json({ Ratings });
});

// to update specific Review
exports.updateReview = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  // let isReview = await ReviewModel.findById(id)
  // if (isReview.user._id != req.id)
  //     return next(new AppError("you don't have a permission", 400));

  let Review = await ReviewModel.findByIdAndUpdate(id, req.body, { new: true });
  !Review && next(new AppError("Review not found", 400));
  Review && res.status(200).json(Review);
});
// to get all Reviews
exports.getReviewsfordriver = catchAsyncError(async (req, res) => {
  const driver = req.id;
  let Ratings = await ReviewModel.find({ driver });
  res.status(200).json({Ratings});
});
// exports.getReviewsforriver = catchAsyncError(async (req, res) => {
//     const{driverID} = req.body
//     const driver =driverID
//     let Reviews = await ReviewModel.find({driver});
//     res.status(200).json(Reviews);
// });

// to delete specific Review
exports.deleteReview = factory.deleteOne(ReviewModel);
