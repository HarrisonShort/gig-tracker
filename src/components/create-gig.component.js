import React, { Component } from 'react';
import axios from 'axios';

export default class CreateGig extends Component {
    constructor(props) {
        // Super refers to the parent class' (Component) constructor.
        // The "this" keyword cannot be used until after you have called the parent constructor.
        super(props);

        this.state = {
            gig_date: '',
            gig_or_fest: 'Gig',
            gig_tourFestName: '',
            gig_bands: '',
            gig_venue: ''
        }

        this.onChangeGigDate = this.onChangeGigDate.bind(this);
        this.onChangeGigOrFest = this.onChangeGigOrFest.bind(this);
        this.onChangeGigTourFestName = this.onChangeGigTourFestName.bind(this);
        this.onChangeGigBands = this.onChangeGigBands.bind(this);
        this.onChangeGigVenue = this.onChangeGigVenue.bind(this);
        //this.changeToTourName = this.changeToTourName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeGigDate(event) {
        this.setState({
            gig_date: event.target.value
        });
    }

    onChangeGigOrFest(event) {
        this.setState({
            gig_or_fest: event.target.value
        });
    }

    onChangeGigTourFestName(event) {
        this.setState({
            gig_tourFestName: event.target.value
        });
    }

    onChangeGigBands(event) {
        this.setState({
            gig_bands: event.target.value
        });
    }

    onChangeGigVenue(event) {
        this.setState({
            gig_venue: event.target.value
        });
    }

    onSubmit = async (event) => {
        event.preventDefault();

        // Change any line breaks into a singular string of comma-separated band/artist names.
        this.state.gig_bands = this.state.gig_bands.replace(/[\n\r]/g, ', ');

        // Log to the console details of the new gig.
        console.log(`Form submitted:`);
        console.log(`Date: ${this.state.gig_date}`);
        console.log(`Gig or Fest?: ${this.state.gig_or_fest}`);
        console.log(`Tour/Fest Name: ${this.state.gig_tourFestName}`);
        console.log(`Bands: ${this.state.gig_bands}`);
        console.log(`Venue: ${this.state.gig_venue}`);

        const newGig = {
            gig_date: this.state.gig_date,
            gig_or_fest: this.state.gig_or_fest,
            gig_tourFestName: this.state.gig_tourFestName,
            gig_bands: this.state.gig_bands,
            gig_venue: this.state.gig_venue
        }

        // Adds to the DB by posting our created newGig object.
        await axios.post('http://localhost:4000/gigs/create', newGig)
            .then(res => console.log(res.data));

        // Reset the state to empty values.
        this.setState({
            gig_date: '',
            gig_or_fest: 'Gig',
            gig_tourFestName: '',
            gig_bands: '',
            gig_venue: ''
        })
    }

    // changeToTourName(gig) {
    //     let label = this.refs.tourNameLabel;

    //     if (gig) {
    //         label.value = 'Tour Name';
    //     } else {
    //         ReactDOM.findDOMNode(this.refs.tourNameLabel).value = 'Festival Name';
    //     }
    // }

    render() {
        return (
            <div className="form" id="gigFormDiv" style={{ marginTop: 30 }} >
                <h3 id="dateHeader">Date</h3>
                <form id="gigForm" onSubmit={this.onSubmit}>
                    <div className="form-check form-check-inline">
                        <div style={{ marginTop: 15 }}>
                            <div className="form-group">
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input"
                                        type="radio"
                                        name="gigOrFestivalRadios"
                                        id="gigRadio"
                                        value="Gig"
                                        checked={this.state.gig_or_fest === 'Gig'}
                                        onChange={this.onChangeGigOrFest}
                                    />
                                    <label className="form-check-label">Gig</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input"
                                        type="radio"
                                        name="gigOrFestivalRadios"
                                        id="festivalRadio"
                                        value="Festival"
                                        checked={this.state.gig_or_fest === 'Festival'}
                                        onChange={this.onChangeGigOrFest}
                                    />
                                    <label className="form-check-label">Festival</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Tour Name:</label>
                                <input type="text"
                                    className="form-control"
                                    id="tourName"
                                    name="tourName"
                                    value={this.state.gig_tourFestName}
                                    onChange={this.onChangeGigTourFestName}
                                />
                            </div>
                            <div className="form-group">
                                <label>Bands:</label>
                                <textarea className="form-control"
                                    id="bands"
                                    name="bands"
                                    value={this.state.gig_bands}
                                    onChange={this.onChangeGigBands}
                                />
                                <small id="bandHelp"
                                    className="form-text text-muted"
                                    style={{ marginTop: 2 }}>
                                    Please place each band/artist on a new line.
                                    </small>
                            </div>
                            <div className="form-group">
                                <label>Venue:</label>
                                <input type="text"
                                    className="form-control"
                                    id="venueName"
                                    name="venueName"
                                    value={this.state.gig_venue}
                                    onChange={this.onChangeGigVenue}
                                />
                            </div>

                            <div className="form-group">
                                <button type="submit" value="Create Gig" className="btn btn-primary">Create Gig</button>
                            </div>
                        </div>
                    </div>
                </form >
            </div>
        )
    }
}

// <button className="btn btn-primary" onClick={this.changeToTourName(true)}>Reset</button>