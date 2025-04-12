const express = require('express');
const exValidator = require('express-validator');

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth')

const router = express.Router();

router.get('/posts', isAuth, feedController.getPosts);

router.post(
    '/post',
    isAuth,
    [
        exValidator
            .body('title')
            .trim()
            .isLength({ min: 5 }),
        exValidator
            .body('content')
            .trim()
            .isLength({ min: 5 }),
    ],
    feedController.createPost
)

router.get('/post/:postId', isAuth, feedController.getPost);

router.put(
    '/post/:postId', 
    isAuth,
    [
        exValidator
            .body('title')
            .trim()
            .isLength({ min: 5 }),
        exValidator
            .body('content')
            .trim()
            .isLength({ min: 5 }),
    ],
    feedController.updatePost
);

router.delete('/post/:postId',isAuth, feedController.deletePost);

module.exports = router;