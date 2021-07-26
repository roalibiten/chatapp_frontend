import React, { Component } from 'react'
import { Text, StyleSheet, View,TextInput,Dimensions,TouchableOpacity } from 'react-native'

export default class MessageCard extends Component {

    constructor(props) {
        super(props);
  
        this.state = {
            
        };
    }


    render() {
        return (
            <View style={styles.container}>
                
                <TouchableOpacity style={styles.topBarView}>
                    <Text> Canlı Destek </Text>
                </TouchableOpacity>

                <View style={styles.chatView}>
                    <Text> sa </Text>
                </View>

            </View>
        )
    }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        position:"absolute",
        width:screenHeight*0.5,
        height:screenHeight*0.6,
        right:20,
        bottom:0,
        
    },
    topBarView:{
        borderTopEndRadius:screenHeight*0.05,
        borderTopLeftRadius:screenHeight*0.05,
        backgroundColor:"green",
        width:screenHeight*0.5,
        height:screenHeight*0.05,
        justifyContent:"center",
        alignItems:'center'

    },
    chatView:{
        width:screenHeight*0.5,
        height:screenHeight*0.55,
        backgroundColor:"red",

    }
})
