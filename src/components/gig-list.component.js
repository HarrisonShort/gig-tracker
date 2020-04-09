import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Gig = props => (
    <tr>
        <td>{props.gig.gig_date}</td>
        <td>{props.gig.gig_or_fest}</td>
        <td>{props.gig.gig_tourFestName}</td>
        <td>{props.gig.gig_bands}</td>
        <td>{props.gig.gig_venue}</td>
        <td>
            <Link to={"/edit/" + props.gig._id}>Edit</Link>
        </td>
        <td>
            <Link to={"/delete/" + props.gig._id}>Delete</Link>
        </td>
    </tr>
)

// function deleteGig(id, props) {
//     console.log('deleting')

//     axios.delete('http://localhost:4000/gigs/delete/' + id)
//         .catch(function (error) {
//             console.log(error);
//         });

//     // Reload the page.
//     //props.history.push('/');
// }

export default class GigList extends Component {
    constructor(props) {
        super(props);
        this.state = { gigs: [] };

        this.deleteGig = this.deleteGig.bind(this);
    }

    deleteGig(id) {
        console.log('deleting')

        axios.delete('http://localhost:4000/gigs/delete/' + id)
            .catch(function (error) {
                console.log(error);
            });

        // Reload the page.
        //props.history.push('/');
    }

    componentDidMount() {
        // Get the list of gigs from the database and assigns the data to the component state.
        axios.get('http://localhost:4000/gigs/')
            .then(response => {
                this.setState({ gigs: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    gigList() {
        // Map each gig in the list so that the information is displayed across each row.
        return this.state.gigs.map(function (currentGig, i) {
            return <Gig gig={currentGig} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Gig List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Gig/Festival</th>
                            <th>Name</th>
                            <th>Bands</th>
                            <th>Venue</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.gigList()}
                    </tbody>
                </table>
            </div>
        )
    }
}