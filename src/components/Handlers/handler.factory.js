
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsync");

exports.deleteOne = (Model) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new AppError("Document not found", 400));
    }
    res.status(200).json({result:document});
  });
};
