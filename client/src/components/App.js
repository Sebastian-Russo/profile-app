import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import User from './user';
import SignupPage from './signup-page';
import './App.css';

function App() {
  return (
    <Router>
        <div className="container app">
            <h1>Welcome to BookFace </h1>
            <Switch>
                <Route 
                    exact
                    path="/"
                    component={SignupPage}
                />
                <Route
                    path="/login"
                    component={SignupPage}
                />
                <Route 
                    path="/user"
                    component={User}
                />
            </Switch>
        </div>
    </Router>
  );
}

export default App;
