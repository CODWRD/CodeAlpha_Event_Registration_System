const authController = require('./../controllers/authController');
const registrationController = require('./../controllers/registrationController');
const express = require('express');
const router = express.Router();

router
  .route('/:eventId')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    registrationController.createRegistration,
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('user'),
    registrationController.getRegistration,
  );

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    registrationController.getAllRegistrations,
  );

router
  .route('/:id')
  .delete(
    authController.protect,
    authController.restrictTo('user'),
    registrationController.deleteRegistration,
  );

module.exports = router;
