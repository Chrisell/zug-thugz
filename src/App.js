import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Page from './Page.js'
import Player from './Player.js'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/player">
          <Player></Player>
        </Route>
        <Route path="/items">
          <Page title="Items"></Page>
        </Route>
        <Route path="/">
          <div className="center">
            <h1>Zug Thugz</h1>
            <div className="banner"></div>
            <h2>US - Benediction</h2>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
