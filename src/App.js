// imports
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import GameLobby from './GameLobby';
import GameBoard from './GameBoard';
import Header from "./Header";
import Footer from "./Footer";




// component
class App extends Component {
  render() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
          <Fragment>
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/lobby/:gameKey" component={GameLobby} />
            <Route path="/gameboard/:gameKey" component={GameBoard} /> 
            <Footer />
          </Fragment>
        </Router>
    )
  }
}

export default App;
