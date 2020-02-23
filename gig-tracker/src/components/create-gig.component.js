import React, { Component } from 'react';
import ReactDOM from "react-dom";

export default class CreateGig extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gig_date: '',
            gig_or_fest: '',
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
        let bands = event.target.value
        bands = bands.replace(/[\n\r]/g, ', ');

        this.setState({
            gig_bands: bands
        });
    }

    onChangeGigVenue(event) {
        this.setState({
            gig_venue: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Date: ${this.state.gig_date}`);
        console.log(`Gig or Fest?: ${this.state.gig_or_fest}`);
        console.log(`Tour/Fest Name ${this.state.gig_tourFestName}`);
        console.log(`Bands: ${this.state.gig_bands}`);
        console.log(`Venue: ${this.state.gig_venue}`);

        this.setState({
            gig_date: '',
            gig_or_fest: '',
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
            <form id="gigForm">
                <div className="form" id="gigFormDiv" style={{ marginTop: 30 }} onSubmit={this.onSubmit}>
                    <h3 id="dateHeader">Date</h3>
                    <div className="form-check form-check-inline">


                        <div style={{ marginTop: 15 }}>
                            <div>
                                <input className="form-check-input" type="radio" name="gigOrFestivalRadios" id="gigRadio"
                                    value="option1" /* onClick={this.changeToTourName(true) } */ defaultChecked></input>
                                <label className="form-check-label">Gig</label>
                                <input className="form-check-input" type="radio" name="gigOrFestivalRadios" id="festivalRadio"
                                    value="option2" /* onClick={this.changeToTourName(false)} */></input>
                                <label className="form-check-label">Festival</label>
                            </div>
                            <label ref='tourNameLabel'>Tour Name</label>
                            <input type="text" className="form-control" id="tourName" name="tourName"></input>
                            <label>Bands</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                name="bandNames"></textarea>
                            <small id="bandHelp" className="form-text text-muted" style={{ marginTop: 2 }}>Please place each
                                band/artist
                        on a new line.</small>
                            <label>Venue</label>
                            <input type="text" className="form-control" id="venueInput" name="venueName"></input>

                            <div>
                                <button type="submit" className="btn btn-primary">Submit</button>

                            </div>
                        </div>
                    </div>
                </div>
            </form >
        )
    }
}

// <button className="btn btn-primary" onClick={this.changeToTourName(true)}>Reset</button>