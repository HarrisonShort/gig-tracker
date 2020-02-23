import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
    render() {
        return (
            <Router>
                <Route path="/" exact component={GigList} />
                <Route path="/edit/:id" component={EditGig} />
                <Route path="/create" component={CreateGig} />
                <div className="container">
                    <h2>Gig Tracker</h2>
                </div>
            </Router>
        )
    }
}
export default App;
