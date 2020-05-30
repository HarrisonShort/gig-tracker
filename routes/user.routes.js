const express = require('express');
const userRoutes = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load user model
const User = require("../models/user.model");

router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Validate input data
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists!" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password before saving in database.
            // "In cryptography, a salt is random data that is used as an additional input to a one-way function that hashes data, a password or passphrase."
            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash(newUser.password, salt, (error, hash) => {
                    if (error) {
                        throw error;
                    }

                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(error => console.log(error));
                })
            })
        }
    });
});

