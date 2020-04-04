const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Gig = new Schema({
    gig_date: {
        type: String
    },
    gig_or_fest: {
        type: String
    },
    gig_tourFestName: {
        type: String
    },
    gig_bands: {
        type: String
    },
    gig_venue: {
        type: String
    }
});

module.exports = mongoose.model('Gig', Gig);