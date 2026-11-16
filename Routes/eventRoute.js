const authController = require('./../Controllers/authController');
const eventController = require('./../Controllers/eventController');
const express = require('express');
const router = express.Router();

router
  .route('/')
  .get(eventController.getAllEvents)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    eventController.createEvent,
  );
router
  .route('/:id')
  .get(eventController.getEvent)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    eventController.updateEvent,
  );
router
  .route('/:id')
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    eventController.deleteEvent,
  );

module.exports = router;
