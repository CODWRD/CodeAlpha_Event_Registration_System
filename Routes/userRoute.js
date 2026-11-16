const express = require('express');
const authController = require('./../Controllers/authController');
const userController = require('./../Controllers/userController');

const router = express.Router();

router.route('/login').post(authController.login);
router.route('/signup').post(authController.signup);


router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getAllUsers,
  );

router
  .route('/deleteMe')
  .delete(authController.protect, userController.deleteMe);

router
  .route('/:id')
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser,
  );

module.exports = router;
