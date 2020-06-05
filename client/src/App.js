import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import CreateGig from "./components/create-gig.component";
import EditGig from "./components/edit-gig.component";
import GigList from "./components/gig-list.component";
import Landing from "./components/landing.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import Logout from "./components/logout.component";
import PrivateRoute from "./components/private-route/PrivateRoute";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());

        // Redirect to login
        window.location.href = "/login";
    }
}

class App extends Component {
    // Renders the main page of the app.
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="navbar-brand">
                                <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/sign-of-the-horns_1f918.png" width="30" height="30" alt="" />
                            </div>
                            <Link to="/" className="navbar-brand">Gig Tracker</Link>
                            <div className="collpase navbar-collapse">
                                <ul className="navbar-nav mr-auto">
                                    <li className="navbar-item">
                                        <Link to="/gigs" className="nav-link">Gigs</Link>
                                    </li>
                                    <li className="navbar-item">
                                        <Link to="/create" className="nav-link">Create Gig</Link>
                                    </li>
                                    {/*<li className="navbar-item">
                                    <Link to="/" className="nav-link">Calendar</Link>
                                </li>*/}
                                </ul>
                            </div>
                            <div className="collpase navbar-collapse">
                                <ul className="navbar-nav ml-auto">
                                    <li className="navbar-item">
                                        <Link to="/logout" className="nav-link">Logout</Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <br />
                        {/* Sets up the webpage paths to each component. */}
                        <Route path="/" exact component={Landing} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/login" exact component={Login} />
                        <Switch>
                            <PrivateRoute exact path="/logout" component={Logout} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/gigs" component={GigList} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/edit/:id" component={EditGig} />
                        </Switch>
                        <Switch>
                            <PrivateRoute exact path="/create" component={CreateGig} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App;