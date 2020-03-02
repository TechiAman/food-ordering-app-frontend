import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../screens/home/Home';
import Checkout from '../screens/checkout/checkout'
import Details from '../screens/details/Details';
import Header from './header/Header';
// import Header from './header/Header';

class Controller extends Component {

  constructor() {
    super();
    this.baseUrl = "http://localhost:8080/api";
  }
  render() {
    return (
      <>
      <Header baseurl={this.baseUrl} />
      <Router>
        <div className="main-container">
      {/*  <Route exact path='/' render={(props) => <Header {...props}  />} />*/}
       <Route exact path='/' render={(props) => <Home {...props} baseUrl={this.baseUrl}  />} /> 
       <Route exact path='/checkout' render={(props) => <Checkout {...props} baseUrl={this.baseUrl}  />} /> 
       <Route exact path='/restaurant/:restaurantId' render={(props) => <Details {...props} baseUrl={this.baseUrl}/>}/>
        </div>
      </Router>
      </>
    )
  }
}

export default Controller;
