import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from "react-router-dom";

import Home from "../src/pages/Home"
import Admin from "../src/pages/Admin"

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/home" children={<Home />} />
          <Route path="/admin" children={<Admin />} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

        </Switch>
      </Router>
      
    )
  }
}

const styles = StyleSheet.create({})
