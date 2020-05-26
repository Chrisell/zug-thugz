import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/App.css'
import Page from './Page.js'
import Info from './Info.js'
import Player from './Player.js'
import Players from './Players.js'
import Spreadsheets from "./Spreadsheets.js"
import Home from './Home.js'


const tags = [
  {cls: <Info></Info>, link: "/info", name: "info"},
  {cls: <Player></Player>, link: "/player", name: "player"},
  {cls: <Players></Players>, link: "/players", name: "players"},
  {cls: <Page title="Items"></Page>, link: "/items", name: "items"},
  {cls: <Spreadsheets></Spreadsheets>, link: "/spreadsheets", name: "spreadsheets"},
  {cls: <Home></Home>, link: "/", name: "home"}
]

function generateLinks() {
  let links = []
  tags.forEach(function (tag) {
    links.push(
      <Route path={tag.link}>
        {tag.cls}
      </Route>
    )
  })
  return (
    <Router>
      <Switch>
        {links}
      </Switch>
    </Router>
  )
}

function App() {
  return (
    generateLinks()
  );
}

export default App;
export {tags};
