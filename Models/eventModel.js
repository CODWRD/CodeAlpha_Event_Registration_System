const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'An event must have a title'],
        unique: true
    },
    organizer: {
        type: String,
        required: [true, 'An event must have an organizer']
    },
    description: {
        type: String,
        required: [true, 'An event must have a description']
    },
    date: {
        type: Date,
        required: [true, 'An event must have a date'],
    },
    location: {
        type: String,
        required: [true, 'An event must have a location']
    }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;