const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Registration = require('./../models/registrationModel');

exports.createRegistration = catchAsync(async (req, res, next) => {
    const name = req.user.name
    const event = req.params.eventId;
    const { email } = req.body;

    if (!email || !(email === req.user.email)) {
        return next(new AppError('Please provide your email', 400));
    }
  const newRegistration = await Registration.create({
    name,
    event,
    email
  });
  res.status(201).json({
    status: 'success',
    data: {
      registration: newRegistration
    }
  });
});

exports.getAllRegistrations = catchAsync(async (req, res, next) => {
  const registrations = await Registration.find();
  res.status(200).json({
    status: 'success',
    results: registrations.length,
    data: {
      registrations
    }
  });
});

exports.getRegistration = catchAsync(async (req, res, next) => {
  const registration = await Registration.findById(req.params.id).populate('event');
  if (!registration) {
    return next(new AppError('No registration found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      registration
    }
  });
});

exports.deleteRegistration = catchAsync(async (req, res, next) => {
  const registration = await Registration.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  });
});