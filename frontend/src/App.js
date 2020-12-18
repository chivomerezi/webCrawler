import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import logo from './assets/ElBuscadito.jpeg';


import Browser from './components/Browser';
import Result from './components/Result';

function App() {

    return (
      <div className="app container">
        <div className="jumbotron">
          
          <div className="card mb-3">
            <img className="card-img-top" src={logo} alt="Card image cap"></img>
          </div>

          <Router>
            <Browser/>
          </Router>
        </div>
        <Router>
            <Route path="/:palabra" exact component={Result}/>
        </Router>
      </div>
    );
  }

export default App;


