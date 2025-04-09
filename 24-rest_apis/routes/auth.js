const express = require('express');
const exValidator = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.put(
    '/signup', 
    [
        exValidator
            .body('email')
            .isEmail()
            .withMessage('Please enter a valid e-mail.')
            .custom((value, { req }) => {
                return User.findOne({email: value}).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Email address already exists!');
                    }
                });
            })
            .normalizeEmail(),
        exValidator
            .body('password')
            .trim()
            .isLength({min: 5}),
        exValidator
            .body('name')
            .trim()
            .not()
            .isEmpty()
    ],
    authController.signup
);

router.post('/login', authController.login);

router.get('/status', isAuth, authController.getUserStatus);

router.patch(
    '/status', 
    isAuth,
    [
        exValidator
            .body('status')
            .trim()
            .notEmpty()
    ],
    authController.updateUserStatus
)

module.exports = router;