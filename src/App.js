// imports
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import GameLobby from './GameLobby';



// component
class App extends Component {
  render() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
          <Route exact path="/" component={Home} />
          <Route exact path="/lobby/:gameKey" component={GameLobby} /> 
        </Router>
    )
  }
}

export default App;
