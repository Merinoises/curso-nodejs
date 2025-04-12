import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import User from '../models/user.js';
import feedController from '../controllers/feed.js';

// Derive __dirname from import.meta.url
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables from the .env file
dotenv.config({ path: join(__dirname, '..', '..', '.env') });

const MONGODB_URI_TEST = process.env.MONGODB_URI_TEST

describe('Feed Controller', function () {
    before(function (done) {
        mongoose.connect(MONGODB_URI_TEST)
            .then(result => {
                const user = new User({
                    email: 'test@test.com',
                    password: 'tester',
                    name: 'Test',
                    posts: [],
                    _id: '5c0f66b979af55031b34728a'
                });
                return user.save();
            })
            .then(() => {
                done();
            })
            .catch(err => console.log(err));
    });

    //beforeEach(function() {});
    //afterEach(function() {});

    //Done se utiliza cuando existen promises y queremos esperar a que se resuelvan
    it('should create post to the posts of the creator', function (done) {

        const req = {
            body: {
                title: 'Test post',
                content: 'A test Post'
            },
            file: {
                path: 'Image path'
            },
            userId: '5c0f66b979af55031b34728a'
        };

        const res = { status: function() {
            return this;
        }, json: function() {}};

        feedController.createPost(req, res, () => {})
            .then((savedUser) => {
                expect(savedUser).to.have.property('posts');
                expect(savedUser.posts).to.have.length(1);
                done();
            })
            .catch(err => {
                console.log(err);
                done(err);
            });
    });

    after(function (done) {
        User.deleteMany({})
            .then(() => {
                return mongoose.disconnect()
            })
            .then(() => {
                done();
            });
    })
});