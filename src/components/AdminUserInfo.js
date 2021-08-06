import React, { Component } from 'react'
import { Text, StyleSheet, View,Dimensions } from 'react-native'

export default class AdminUserInfo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.titleText}> Ad Soyad: </Text>
                    <Text style={styles.descText}> {this.props.name} </Text>

                </View>
                <View style={styles.row}>
                    <Text style={styles.titleText}> IP: </Text>
                    <Text style={styles.descText}> {this.props.IP}</Text>

                </View>
                <View style={styles.row}>
                    <Text style={styles.titleText}> Ilk Yazisma Tarihi: </Text>
                    <Text style={styles.descText}> 02.08.2021 </Text>

                </View>
                <View style={styles.row}>
                    <Text style={styles.titleText}> Cihaz: </Text>
                    <Text style={styles.descText}> {this.props.device} </Text>

                </View>
            </View>
        )
    }
}
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        width:screenWidth*0.2,
        height:screenHeight*0.9,
        backgroundColor:"black",
        borderRadius:7,
        borderTopLeftRadius:0,
        borderBottomLeftRadius:0,
        backgroundColor:"#ECECEC",
        justifyContent:"flex-end",
        alignItems:"flex-end",
        padding:10,
        paddingBottom:50

    },
    row:{
        flexDirection:"row",
        marginTop:10

        
    }
})
