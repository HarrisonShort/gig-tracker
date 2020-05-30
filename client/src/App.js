import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import CreateGig from "./components/create-gig.component";
import EditGig from "./components/edit-gig.component";
import GigList from "./components/gig-list.component";
import DeleteGig from "./components/delete-gig.component";

import logo from "./logo.svg"

class App extends Component {
    // Renders the main page of the app.
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" target="_blank">
                            <img src={logo} width="30" height="30" href="http://google.com" />
                        </a>
                        <Link to="/" className="navbar-brand">Gig Tracker</Link>
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">Gigs</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/create" className="nav-link">Create Gig</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">Calendar</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <br />
                    {/* Sets up the webpage paths to each component. */}
                    <Route path="/" exact component={GigList} />
                    <Route path="/edit/:id" component={EditGig} />
                    <Route path="/create" component={CreateGig} />
                    <Route path="/delete/:id" component={DeleteGig} />
                </div>
            </Router>
        )
    }
}
export default App;
