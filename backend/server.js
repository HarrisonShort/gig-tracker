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

// Connect to our mongo db database.
mongoose.connect('mongodb://127.0.0.1:27017/gig-tracker', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

// Route for the main page.
// When started, finds the list of gigs from the database.
gigRoutes.route('/').get(function (req, res) {
    Gig.find(function (err, gigs) {
        if (err) {
            console.log(err);
        } else {
            res.json(gigs);
        }
    });
});

// Route with functionality to get a gig by ID.
gigRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Gig.findById(id, function (err, gig) {
        res.json(gig);
    })
})

// Route for updating a gig.
// Called the Edit Gig button is pressed on the /edit page.
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

// Route for the Add Gig page.
// Called the Create Gig button is pressed on the /create page.
gigRoutes.route('/create').post(function (req, res) {
    let gig = new Gig(req.body);
    gig.save()
        .then(gig => {
            res.status(200).json({ 'gig': 'gig added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new gig failed');
        });
});

// Route for deleting a gig.
// Called from the button on the gig list.
gigRoutes.route('/delete/:id').delete(function (req, res) {
    Gig.findById(req.params.id, function (err, gig) {
        if (!gig) {
            res.status(404).send("gig not found");
        } else {
            gig.deleteOne()
                .then(gig => {
                    res.json('Gig deleted.');
                })
                .catch(err => {
                    res.status(400).send("Could not delete");
                })
        }
    })
});

// Set the routes defined above.
// Format Example: .../gigs/create
app.use('/gigs', gigRoutes);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});