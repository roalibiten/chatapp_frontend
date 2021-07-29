import React, { Component } from 'react'
import { Text, StyleSheet, View,Dimensions } from 'react-native'

export default class MessageBubble extends Component {
    render() {
        return (
            <View>
                <View style={this.props.from=="employee"? styles.employeeBubbleView:  styles.userBubbleView}>
                    <Text> {this.props.message} </Text>
                </View>

            </View>
            
           
            
        )
    }
}
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    
    employeeBubbleView:{
        marginVertical:screenHeight*0.01,

        maxWidth:screenHeight*0.4,
        backgroundColor:"#FFE1B0",
        marginLeft:screenHeight*0.02,
        marginRight:screenHeight*0.05,

        borderRadius:screenHeight*0.01,
        borderBottomLeftRadius:0,
        padding:screenHeight*0.01,
        alignSelf: 'flex-start',


        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    userBubbleView:{
        marginVertical:screenHeight*0.01,

        maxWidth:screenHeight*0.4,

        backgroundColor:"white",
        marginRight:screenHeight*0.02,
        marginLeft:screenHeight*0.05,

        borderRadius:screenHeight*0.01,
        borderBottomRightRadius:0,
        padding:screenHeight*0.01,
        alignSelf: 'flex-end',



        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

})
