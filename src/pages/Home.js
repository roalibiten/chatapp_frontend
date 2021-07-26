import React, { Component } from 'react'
import { Text, StyleSheet, View, Image,Dimensions } from 'react-native'

export default class Home extends Component {
    render() {
        return (
            <View style={styles.mainContainer} >
                 <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://www.cyberpark.com.tr/content/upload/companies/etiya_yeni.png',
                      }}
                    style={styles.image}
                    resizeMode="center"
                />
            </View>
        )
    }
}
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    mainContainer:{
        width:screenWidth,
        height:screenHeight,
        //backgroundColor:"#303030",
        justifyContent:"center",
        alignItems:"center"
    },
    image:{
        width:screenWidth*0.5,
        height:screenHeight*0.5
    }
})
