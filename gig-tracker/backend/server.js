const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const gigRoutes = express.Router();
const PORT = 4000;

let Gig = require('./gig.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/gig-tracker', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

gigRoutes.route('/').get(function (req, res) {
    Gig.find(function (err, gigs) {
        if (err) {
            console.log(err);
        } else {
            res.json(gigs);
        }
    });
});

gigRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Gig.findById(id, function (err, gig) {
        res.json(gig);
    })
})

gigRoutes.route('/update/:id').post(function (req, res) {
    Gig.findById(req.params.id, function (err, gig) {
        if (!gig) {
            res.status(404).send("gig not found");
        } else {
            gig.gig_date = req.body.gig_date;
            gig.gig_or_fest = req.body.gig_or_fest;
            gig.gig_tourFestName = req.body.gig_tourFestName;
            gig.gig_bands = req.body.gig_bands;
            gig.gig_venue = req.body.gig_venue;

            gig.save()
                .then(gig => {
                    res.json('Gig updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
});

gigRoutes.route('/add').post(function (req, res) {
    let gig = new Gig(req.body);
    gig.save()
        .then(gig => {
            res.status(200).json({ 'gig': 'gig added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new gig failed');
        });
});

app.use('/gigs', gigRoutes);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});