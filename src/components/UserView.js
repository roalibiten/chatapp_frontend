import React, { Component } from 'react'
import { Text, StyleSheet, View,Dimensions,TouchableOpacity } from 'react-native'

export default class UserView extends Component {
    render() {
        return (
            <View style={styles.userView}>
                <View style={styles.nameView}>
                    <Text style={styles.nameText}> {this.props.name} </Text>
                </View>
                <View style={styles.lastMessageView}>
                    <Text style={styles.lastMessageText}> {this.props.lastMessage} </Text>
                </View>
            </View>
        )
    }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    userView:{
        height:screenHeight*0.1,
        marginTop:7,
        backgroundColor:"#E5E5E5",


        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    nameView:{
        flex:1,
        justifyContent:"center",
    },
    lastMessageView:{
        flex:1,

    },
    nameText:{
        fontWeight:"bold",
        paddingHorizontal:5,
    },
    lastMessageText:{
        paddingHorizontal:5,
        color:"#575757"
    }
})
