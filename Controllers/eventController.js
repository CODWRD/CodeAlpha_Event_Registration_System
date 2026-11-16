const Event = require('./../models/eventModel');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');

exports.createEvent = catchAsync(async (req, res,next) => {
    const newEvent = await Event.create(req.body);
    if (!newEvent) {
        return next(new AppError('Failed to create event', 400));
    }
    res.status(201).json({
        status: 'success',
        data: {
            event: newEvent
        }
    });
});

exports.getAllEvents = catchAsync(async (req, res,next) => {
    const events = await Event.find();
    if (!events) {
        return next(new AppError('No events found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            events
        }
    });
});

exports.getEvent = catchAsync(async (req, res,next) => { 
    const event = await Event.findById(req.params.id);
    if (!event) {
        return next(new AppError('Event not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            event
        }
    });
});

exports.updateEvent = catchAsync(async (req, res,next) => {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!event) {
        return next(new AppError('Event not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            event
        }
    });
});

exports.deleteEvent = catchAsync(async (req, res) => {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
        return next(new AppError('Event not found', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null
    });
});
