import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import User from '../models/user.js';
import authController from '../controllers/auth.js';

// Derive __dirname from import.meta.url
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables from the .env file
dotenv.config({ path: join(__dirname, '..', '..', '.env') });

const MONGODB_URI_TEST = process.env.MONGODB_URI_TEST

describe('Auth Controller', function () {
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
    });

    //beforeEach(function() {});
    //afterEach(function() {});

    //Done se utiliza cuando existen promises y queremos esperar a que se resuelvan
    it('should throw an error with code 500 if accessing the database fails', function (done) {
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const req = {
            body: {
                email: 'test@test.com',
                password: 'tester'
            }
        };

        authController.login(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            done();
        });

        User.findOne.restore();
    });

    it('should send a responde with valid user status for an existing user', function (done) {
        const req = { userId: '5c0f66b979af55031b34728a' };
        const res = {
            status: 500,
            userStatus: null,
            status: function (code) {
                this.statusCode = code;
                return this;
            },
            json: function (data) {
                this.userStatus = data.status;
            }
        };
        authController.getUserStatus(req, res, () => { })
            .then(() => {
                expect(res.statusCode).to.be.equal(200);
                expect(res.userStatus).to.be.equal('I am new!');
                done();
            })
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