const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const keys = require("../config/keys");

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secretOrKey
};

module.exports = passport => {
    passport.use(
        new JWTStrategy(options, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }

                    return done(null, false);
                })
                .catch(error => console.log(error));
        })
    );
};