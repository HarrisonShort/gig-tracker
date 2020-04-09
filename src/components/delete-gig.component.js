import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteGig extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);


    }

    componentDidMount() {
        console.log(this.props.match.params.id)

        axios.get('http://localhost:4000/gigs/' + this.props.match.params.id)
            .then(response => {
                console.log('got it')
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            })
        console.log(this.props.match.params.id)

        this.delete(this.props.match.params.id)
    }

    delete = async (id) => {

        await axios.delete('http://localhost:4000/gigs/delete/' + id)
            .catch(function (error) {
                console.log(error);
            });

        // Change the display back to the main page (Gig List).
        this.props.history.push('/');
    }

    render() {
        // Don't render anything.
        return null;
    }
}