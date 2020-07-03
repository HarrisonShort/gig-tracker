import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Gig = props => (
    <tr>
        <td className={props.gig.gig_cancelled ? 'cancelled' : ''}>{props.gig.gig_date}</td>
        <td className={props.gig.gig_cancelled ? 'cancelled' : ''}>{props.gig.gig_or_fest}</td>
        <td className={props.gig.gig_cancelled ? 'cancelled' : ''}>{props.gig.gig_tourFestName}</td>
        <td className={props.gig.gig_cancelled ? 'cancelled' : ''}>{props.gig.gig_bands}</td>
        <td className={props.gig.gig_cancelled ? 'cancelled' : ''}>{props.gig.gig_venue}</td>
        <td>
            <Link to={"/edit/" + props.gig._id}>Edit</Link>
        </td>
        <td>
            <Link to='/' onClick={() => {
                if (window.confirm(`Are you sure you wish to delete this gig? (${props.gig.gig_tourFestName})`)) {
                    //window.location.href = "/delete/" + props.gig._id;
                    deleteGig(props.gig._id);
                }
            }}>Delete</Link>
        </td>
    </tr>
)

const deleteGig = async (id) => {
    let gigId = { 'id': id };

    // Delete from user's profile
    await axios.patch('/users/deletegig/' + localStorage.userID, gigId);

    // Delete the gig at the specified ID.
    await axios.delete('/gigs/delete/' + id)
        .then(() => window.location.reload())
        .catch(function (error) {
            console.log(error);
        });
}

export default class GigList extends Component {
    constructor(props) {
        super(props);
        this.state = { gigs: [] };
    }

    componentDidMount() {
        axios.get('/users/getgigs/' + localStorage.userID)
            .then(response => {
                console.log(response.data);
                let gigIds = { 'ids': response.data };
                console.log(gigIds);
                axios.post('/gigs/usergigs', gigIds)
                    .then(response => {
                        console.log(response.data);
                        this.setState({ gigs: response.data.gigs })
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            })
            .catch(function (error) {
                console.log(error);
            })

        // // Get the list of gigs from the database and assigns the data to the component state.
        // axios.get('/gigs/')
        //     .then(response => {
        //         this.setState({ gigs: response.data });
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
    }

    gigList() {
        // Sort gigs chronologically.
        let chronologicalGigs = this.state.gigs.sort((a, b) => new Date(a.gig_date.split(" - ")[0]) - new Date(b.gig_date.split(" - ")[0]));

        // Map each gig in the list so that the information is displayed across each row.
        return chronologicalGigs.map(function (currentGig, i) {
            if (chronologicalGigs.length === 0) {
                return <h3>Your gig list is empty! Add a gig <Link to={"/create"}>here</Link>.</h3>
            }

            return <Gig gig={currentGig} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Your Gig List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th style={{ width: '15%' }}>Date</th>
                            <th style={{ width: '5%' }}>Gig/Festival</th>
                            <th style={{ width: '10%' }}>Name</th>
                            <th style={{ width: '60%' }}>Bands</th>
                            <th style={{ width: '20%' }}>Venue</th>
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