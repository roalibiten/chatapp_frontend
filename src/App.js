import React, { Component } from 'react'
import { Text, StyleSheet, View,Dimensions } from 'react-native'
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
      <View style={styles.container}>
      <Router>
        <Switch>
          <Route path="/home" children={<Home />} />
          <Route path="/admin" children={<Admin />} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

        </Switch>
      </Router>
      </View>
      
    )
  }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container:{
    width:screenHeight*0.5,
    height:screenHeight*0.6,

    
    
},
})
