const User = require("./../models/userModel");
const AppError = require("./../Utils/appError");
const catchAsync = require("./../Utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return next(new AppError("No users found", 404));
  }
  res.status(200).json({
    status: "Success",
    data: users,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(201).json({
    status: "Success",
    data: null,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }
  res.status(204).json({
    status: "Success",
    data: null,
  });
});
