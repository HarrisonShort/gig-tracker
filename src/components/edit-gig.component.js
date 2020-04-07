import React, { Component } from 'react';
import axios from 'axios';

export default class EditGig extends Component {
    constructor(props) {
        super(props);

        this.onChangeGigBands = this.onChangeGigBands.bind(this);
        this.onChangeGigOrFest = this.onChangeGigOrFest.bind(this);
        this.onChangeGigTourFestName = this.onChangeGigTourFestName.bind(this);
        this.onChangeGigVenue = this.onChangeGigVenue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            gig_date: '',
            gig_or_fest: '',
            gig_tourFestName: '',
            gig_bands: '',
            gig_venue: ''
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
        const obj = {
            gig_or_fest: this.state.gig_or_fest,
            gig_tourFestName: this.state.gig_tourFestName,
            gig_bands: this.state.gig_bands,
            gig_venue: this.state.gig_venue,
        };
        console.log(obj);
        axios.post('http://localhost:4000/gigs/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    componentDidMount() {
        console.log('http://localhost:4000/gigs/' + this.props.match.params.id);
        axios.get('http://localhost:4000/gigs/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    gig_or_fest: response.data.gig_or_fest,
                    gig_tourFestName: response.data.gig_tourFestName,
                    gig_bands: response.data.gig_bands,
                    gig_venue: response.data.gig_venue
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

                    {/* <div className="form-check">
                        <input className="form-check-input"
                            id="completedCheckbox"
                            type="checkbox"
                            name="completedCheckbox"
                            onChange={this.onChangeTodoCompleted}
                            checked={this.state.todo_completed}
                            value={this.state.todo_completed}
                        />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Cancelled
                        </label>
                    </div>
                    <br /> */}

                    <div className="form-group">
                        <input type="submit" value="Edit Gig" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}