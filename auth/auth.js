require('dotenv').config();

const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// get mongo connection string and used models
const mongo = require('../db/mongo');
const UserModel = require('../models/User');

// Joi validation schema's
const signUpSchema = require('../schema/auth').signUpSchema;
const loginSchema = require('../schema/auth').loginSchema;


function createTokenSendResponse(user, res, next) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        active: user.active
    };

    jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '1d'
    }, (err, token) => {
        if (err) {
            respondError422(res, next);
        } else {
            res.json({
                token
            });
        }
    });
}

router.post('/signup', (req, res, next) => {
    const result = Joi.validate(req.body, signUpSchema);
    if (result.error === null) {
        UserModel.findOne({
            username: req.body.username
        }).exec().then(user => {
            if (user) {
                const err = new Error('User already exists!');
                next(err)
            } else {
                // hash password and make userModel
                bcrypt.hash(req.body.password, 12).then(hashed => {
                    let model = new UserModel({
                        username: req.body.username,
                        password: hashed,
                        email: req.body.email,
                        role: 'user',
                        active: false
                    });

                    // save user to the database
                    model.save().then(data => {
                        //TODO: add user redirect on front-end, or sign the jwt token and redirect
                        const redirectUser = {
                            _id: data._id,
                            username: data.username,
                            email: data.email,
                            role: data.role,
                            active: false
                        };
                        createTokenSendResponse(redirectUser, res, next);

                    });

                })
            }
        });
    } else {
        res.status(422);
        next(result.error);
    }
});

// TODO: add rate-limiting
router.post('/login', (req, res, next) => {
    const result = Joi.validate(req.body, loginSchema);
    if (result.error === null) {
        UserModel.findOne({
            username: req.body.username,
        }).then(user => {
            if (user) {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((result) => {
                        if (result) {
                            createTokenSendResponse(user, res, next);
                        } else {
                            respondError422(res, next);
                        }
                    });
            } else {
                respondError422(res, next);
            }
        })
    } else {
        respondError422(res, next)
    }
});

function respondError422(res, next) {
    res.status(422);
    const error = new Error('Unable to login.');
    next(error);
}

module.exports = router;
