import React, { Component } from 'react'
import { Text, StyleSheet, View,TextInput,Dimensions,TouchableOpacity } from 'react-native'

import AdminMessageBox from '../components/AdminMessageBox';


export default class admin extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            username:"",
            password:"",
            loged:"false",

            

        };
      }


    login(username,password){
        console.log(this.state.username+this.state.password)
        if(username=="" && password==""){
            this.setState({
                loged:true
            })
            console.log(this.state.loged)

        }

    } 
      
    render() {
        console.log(this.state.loged)
        return (
            <View style={styles.mainContainer}>
                {this.state.loged==true? 
                
                    <AdminMessageBox/>
                
                :

                <View style={styles.mainView}>
                    <Text style={styles.titleText}> Admin Login </Text>
                    <View style={styles.inputsView} >
                        <TextInput
                            placeholder="Username"
                            onChangeText={(username) => this.setState({ username })}

                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Password"
                            onChangeText={(password) => this.setState({ password })}

                            secureTextEntry={true}
                            style={styles.input}
                        />
                        <TouchableOpacity style={styles.buttonView}
                            onPress={()=>{this.login(this.state.username,this.state.password)}}
                        >
                            <Text style={styles.buttonText}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                
                }

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
        backgroundColor:"#303030",
        justifyContent:"center",
        alignItems:"center"
    },
    mainView:{
        //borderColor:"white",
        borderWidth:1,
        borderRadius:10,
        paddingVertical:10,
        paddingHorizontal:60,

        backgroundColor:"black"

    },
    titleText:{
        color:"white",
        alignSelf:"center",
        marginBottom:20,
        fontWeight:"bold",
        fontSize:18,
    },
    input:{
        marginBottom:10,
        color:"white",
        paddingHorizontal:7,
        paddingVertical:7,

        borderColor:"white",
        borderWidth:1,
        borderRadius:5
    },
    buttonView:{
        alignSelf:"center",
        borderWidth:1,
        borderColor:"white",
        borderRadius:5,

    },
    buttonText:{
        color:"white",
        padding:7,
        alignSelf:"center"
    },

    
})
