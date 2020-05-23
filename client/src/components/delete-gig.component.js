import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteGig extends Component {
    constructor(props) {
        super(props);
        this.deleteGig = this.deleteGig.bind(this);

        this.deleteGig(this.props.match.params.id)
    }

    deleteGig = async (id) => {
        // Delete the gig at the specified ID.
        await axios.delete('http://localhost:4000/gigs/delete/' + id)
            .catch(function (error) {
                console.log(error);
            });

        // Change the display back to the main page (Gig List).
        this.props.history.push('/gig-tracker/');
    }

    render() {
        // Don't render anything.
        return null;
    }
}