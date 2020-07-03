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

userRoutes.post("/register", (req, res) => {
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
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                gigs: []
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

userRoutes.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Validate input data
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found!" });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    username: user.username
                };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (error, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect!" });
            }
        });
    });
});

userRoutes.route("/updategigs/:id").post(function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!user) {
            return res.status(404).json({ user: "User not found!" });
        }

        if (!user.gigs) {
            user['gigs'] = [];
        }

        user.gigs.push(req.body.id);

        user.save()
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                res.status(400).send("Could not update!");
            })
    })
})

userRoutes.route('/deletegig/:id').patch(function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!user) {
            return res.status(404).send("gig not found");
        }

        const index = user.gigs.indexOf(req.body.id);

        if (index > -1) {
            user.gigs.splice(index, 1);
        } else {
            res.status(400).send("Could not find gig!");
        }

        user.save()
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                res.status(400).send("Could not update!");
            })
    })
});

userRoutes.route('/getgigs/:id').get(function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!user) {
            return res.status(404).send("user not found");
        }

        return res.json(user.gigs);
    })
})

userRoutes.route('/').get(function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.route('/:id').get(function (req, res) {
    User.findById(req.params.id, function (err, user) {
        res.json(user);
    })
})

module.exports = userRoutes;
