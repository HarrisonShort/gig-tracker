const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creates the data structure for a Gig.
let User = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateSignedUp: {
        type: String,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    },
    gigs: {
        type: [String],
        default: undefined
    }
});

module.exports = mongoose.model('User', User);