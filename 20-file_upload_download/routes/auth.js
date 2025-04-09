const express = require('express');
const exValidator = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login',
    [
        exValidator
            .body('email')
            .isEmail()
            .withMessage('Email no válido')
            .custom((value, { }) => {
                return User.findOne({ email: value })
                    .then(userDoc => {
                        if (!userDoc) {
                            return Promise.reject(
                                `Este email no existe como usuario: ${value}`
                            );
                        } else {
                            return true;
                        }
                    });
            })
            .normalizeEmail(),
        exValidator
            .body(
                'password',
                'La contraseña debe ser alfanumérica y con al menos 5 caracteres.'
            )
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim()
    ],
    authController.postLogin
);

router.post('/signup',
    [
        //El validador check buca email en el body, en las cookies, en los headers, en todos sitios
        exValidator
            .check('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .custom((value, { }) => {
                // if (value === 'test@test.com') {
                //     throw new Error('Este email esta prohibidísimo');
                // }
                // return true;
                return User.findOne({ email: value })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject(
                                'Email ya utilizado en otra cuenta. Escoge otro.'
                            );
                        }
                    });
            })
            .normalizeEmail(),
        //Aquí en vez de en todos sitios, buscará password solo en el body
        exValidator
            .body(
                'password',
                'Utilice una contraseña con solo números y letras y de al menos 5 caracteres'
            )
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim(),
        exValidator
            .body('confirmPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Las contraseñas no son iguales');
                }
                return true;
            })
            .trim(),
    ],
    authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);


module.exports = router;