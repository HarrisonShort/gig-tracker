import React, { Component } from 'react';
import axios from 'axios';

export default class EditGig extends Component {
    constructor(props) {
        // Super refers to the parent class' (Component) constructor.
        // The "this" keyword cannot be used until after you have called the parent constructor.
        super(props);

        this.onChangeGigBands = this.onChangeGigBands.bind(this);
        this.onChangeGigOrFest = this.onChangeGigOrFest.bind(this);
        this.onChangeGigTourFestName = this.onChangeGigTourFestName.bind(this);
        this.onChangeGigVenue = this.onChangeGigVenue.bind(this);
        this.onChangeGigCancelled = this.onChangeGigCancelled.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            gig_date: '',
            gig_or_fest: '',
            gig_tourFestName: '',
            gig_bands: '',
            gig_venue: '',
            gig_cancelled: false
        }
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

    onChangeGigCancelled(event) {
        this.setState({
            gig_cancelled: !this.state.gig_cancelled
        });
    }

    onSubmit = async (event) => {
        event.preventDefault();

        // Change any line breaks into a singular string of comma-separated band/artist names.
        this.state.gig_bands = this.state.gig_bands.replace(/[\n\r]/g, ', ');

        // Create a new object containing our updated gig.
        const updatedGig = {
            gig_or_fest: this.state.gig_or_fest,
            gig_tourFestName: this.state.gig_tourFestName,
            gig_bands: this.state.gig_bands,
            gig_venue: this.state.gig_venue,
            gig_cancelled: this.state.gig_cancelled
        };
        console.log(updatedGig);

        // Overwrite the existing data using the given ID.
        // We await here because we want the changes to complete before the user sees the main page again.
        await axios.post('http://localhost:4000/gigs/update/' + this.props.match.params.id, updatedGig)
            .then(res => console.log(res.data));

        // Change the display back to the main page (Gig List).
        this.props.history.push('/');
    }

    componentDidMount() {
        // Get the gig from the DB based on the given ID and set it to the current state of the page.

        axios.get('http://localhost:4000/gigs/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    gig_or_fest: response.data.gig_or_fest,
                    gig_tourFestName: response.data.gig_tourFestName,
                    gig_bands: response.data.gig_bands,
                    gig_venue: response.data.gig_venue,
                    gig_cancelled: response.data.gig_cancelled === undefined ? false : response.data.gig_cancelled
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="form" id="gigFormDiv">
                <h3>Edit Gig</h3>
                <form onSubmit={this.onSubmit}>
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
                        <label>Tour Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.gig_tourFestName}
                            onChange={this.onChangeGigTourFestName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Bands: </label>
                        <textarea
                            type="text"
                            className="form-control"
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
                        <label>Venue: </label>
                        <input
                            id="venueName"
                            name="venueName"
                            type="text"
                            className="form-control"
                            value={this.state.gig_venue}
                            onChange={this.onChangeGigVenue}
                        />
                    </div>

                    <div className="form-check">
                        <input className="form-check-input"
                            id="gigCancelledCheckbox"
                            type="checkbox"
                            name="gigCancelledCheckbox"
                            onChange={this.onChangeGigCancelled}
                            checked={this.state.gig_cancelled}
                            value={this.state.gig_cancelled}
                        />
                        <label className="form-check-label" htmlFor="gigCancelledCheckbox">
                            Cancelled
                        </label>
                    </div>
                    <br />

                    <div className="form-group">
                        <input type="submit" value="Edit Gig" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}