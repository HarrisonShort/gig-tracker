import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

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
                                    <Link to="/gig-tracker/" className="nav-link">Gigs</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/gig-tracker/create" className="nav-link">Create Gig</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/gig-tracker/" className="nav-link">Calendar</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <br />
                    {/* Redirect from the root path to the gig-tracker path */}
                    <Route exact path="/" >
                        <Redirect to="/gig-tracker/" />
                    </Route>
                    {/* Sets up the webpage paths to each component. */}
                    <Route path="/gig-tracker/" exact component={GigList} />
                    <Route path="/gig-tracker/edit/:id" component={EditGig} />
                    <Route path="/gig-tracker/create" component={CreateGig} />
                    <Route path="/gig-tracker/delete/:id" component={DeleteGig} />
                </div>
            </Router>
        )
    }
}
export default App;
