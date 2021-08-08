import React, { Component } from 'react'
import { Text, StyleSheet, View,TextInput,Dimensions,TouchableOpacity,Animated ,Image,ScrollView} from 'react-native'
import SockJS from "sockjs-client"
import { Stomp } from '@stomp/stompjs';
import axios from 'axios'
import {isMobile} from 'react-device-detect';


import MessageBubble from './MessageBubble';

var stompClient=null;

export default class MessageCard extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            opened:false,
            dialogs:[{from:"employee",message:"Merhaba! Hosgeldiniz.",time:"14.30"},
            {from:"user",message:"Merhaba!.",time:"14.31"},
            {from:"user",message:"Merhaba!.",time:"14.31"},
            {from:"employee",message:"Merhaba! Hosgeldiniz.",time:"14.33"},
            {from:"user",message:"Merhaba!.",time:"14.34"},
            {from:"employee",message:"Merhaba! Hosgeldiniz.",time:"14.35"},
            {from:"user",message:"Merhaba!.",time:"14.35"},
            {from:"employee",message:"Merhaba! Hosgeldiniz.",time:"14.35"},
            {from:"user",message:"Merhaba!.",time:"14.36"}],
            components:[],
            knownUser:false,
            usersName:"",
            usersMailAddress:"",
            message:"",
            device:"unknown",
            IP:"unknown"
        };

        this.yPosition=new Animated.Value(0);
        

    }


    componentDidMount(){
        this.createComponents()
        this.getDeviceInfo();

        
    }
    async getDeviceInfo () {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log("IPPPP"+res.data.IPv4);
        var IP=res.data.IPv4;
        var device="unknown"
        if(isMobile){
            device="Mobile"
        }else{
            device="Computer"
        }
        console.log("DEVICEE"+device)
        this.setState({
            IP,
            device
        })
        

        
    }

    animation(){
        if(this.state.opened==false){
            
            Animated.timing(
                this.yPosition,
                {
                  toValue: 0,
                  duration: 750,
                }
              ).start(
                this.setState({
                    opened:true
                })
            );
              
        }else{
            Animated.timing(
                this.yPosition,
                {
                  toValue: 0,
                  duration: 750,
                }
              ).start(
                this.setState({
                    opened:false
                })
            );
              
        }
        
    }

    createComponents(){
        var oldComponents=this.state.components
        var components=this.state.components
        var messageBox;
        for(var x in this.state.dialogs){
                messageBox=(
                   
                        <MessageBubble
                            from={this.state.dialogs[x].from}
                            message={this.state.dialogs[x].message}
                            screen="consumerScreen"
                            time={this.state.dialogs[x].time}


                        />
                )
                components.push(messageBox);
        }

        this.setState({
            components,
            dialogs:[]
        })





    }

    async personalInfoContinue(){
        this.setState({knownUser: true});


        if(this.state.usersMailAddress!="" && this.state.usersMailAddress!=""){

              
                var socket = new SockJS('http://localhost:8080/chat' );
                stompClient = Stomp.over(socket);
                var usersName=this.state.usersName
                console.log("sunu dinliyorum"+usersName)
                stompClient.connect({}, function(frame) {
                    const _this=this;

                    //setConnected(true);
                    console.log('Connected: ' + frame);
                    stompClient.subscribe( "/chat/"+usersName, function (message) {
                        console.log("yENI MESAJ");
                        //handleReceivedMessage(JSON.parse(message.body));
                    });
                });
           
            
            
        }
    }


    sendMessage(){
        console.log("IP ADRES"+this.state.IP)
        var message={
            sender:this.state.usersName,
            message:this.state.message,
            sendTo:"employee",
            ip:this.state.IP.toString(),
            device:this.state.device
        }


            stompClient.send("/toEmployee", {},
            JSON.stringify(message));


        this.setState({
            dialogs:this.state.dialogs.push(message),
            message:""
        })
        this.createComponents()

        
        
    }

    render() {
        
        return (
            <Animated.View style={[styles.container,{bottom:this.yPosition}]}>
                
                <TouchableOpacity style={styles.topBarView}
                    onPress={()=>{this.animation()}}
                >
                    <Text> Canlı Destek </Text>
                </TouchableOpacity>
                {this.state.opened? 
                
                 <View style={styles.chatView}>

                    {this.state.knownUser? 

                    
<View>
<ScrollView style={styles.dialogView}

>


{this.state.components}

</ScrollView>
<View style={styles.bottomBarView}>
 <TextInput
     style={styles.inputView}
     placeholder="Your Message"
     value={this.state.message}
     onChangeText={(message) => this.setState({ message })}


 />
<TouchableOpacity style={{alignItems:"center",justifyContent:"center"}}
    onPress={()=>{this.sendMessage()}}
>
    <Image
        source={{
            uri: 'https://image.flaticon.com/icons/png/512/1933/1933005.png',
        }}
        style={styles.image}
        resizeMode="center"
    />
</TouchableOpacity>
</View>
</View>
                    
                    :
                    <View>
                    <Text style={styles.personalInfoTitle}>Kullanici Bilgileri</Text>
                    <View style={styles.personalInfoView}>
                        <TextInput
                            style={styles.personalInfoInput}
                            placeholder="Ad Soyad"
                            onChangeText={(usersName) => this.setState({ usersName })}

                        />
                        <TextInput
                            style={styles.personalInfoInput}
                            placeholder="Mail Adresi"
                            onChangeText={(usersMailAddress) => this.setState({ usersMailAddress })}

                            
                        />
                        <TouchableOpacity style={styles.personelInfoButton}
                            onPress={()=>{this.personalInfoContinue()}}
                        >
                            <Text style={{color:"white"}}>Ilerle</Text>
                        </TouchableOpacity>
                        
                        </View>    
                    </View>
                    
                    
                    
                    }

                
                 
                 
             </View>
             
                
                : null}
                 

            </Animated.View>
        )
    }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        position:"absolute",
        width:screenHeight*0.5,
        //height:screenHeight*0.6,
        right:20,
        bottom:0,

        
        
    },
    topBarView:{
        borderTopEndRadius:screenHeight*0.05,
        borderTopLeftRadius:screenHeight*0.05,
        backgroundColor:"#FFAF1A",
        width:screenHeight*0.5,
        height:screenHeight*0.05,
        justifyContent:"center",
        alignItems:'center',

              

        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    chatView:{
        width:screenHeight*0.5,
        height:screenHeight*0.55,
        backgroundColor:"#F8F8F8",
      
        


        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,



    },
    inputView:{
        width:screenHeight*0.45,
        height:screenHeight*0.05,
        justifyContent:"center",
        paddingHorizontal:6,
        marginBottom:6,

        

    },
    dialogView:{
        width:screenHeight*0.5,
        height:screenHeight*0.50,
    },
    bottomBarView:{
        flexDirection:"row",
        borderTopWidth:1,

        borderColor:"#DDDDDD",
    },
    image:{
        width:screenWidth*0.03,
        height:screenHeight*0.03,
        alignSelf:"center"
    },
    personalInfoView:{
        width:screenHeight*0.4,
        height:screenHeight*0.2,
        alignSelf:"center",
        marginTop:screenHeight*0.15,
        borderWidth:1,
        borderRadius:10,
        borderColor:"#FFCD7C",
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        alignItems:"center",
        justifyContent:"center"
    },
    personalInfoInput:{
        width:screenHeight*0.2,
        borderWidth:1,
        borderColor:"#DDDDDD",
        borderRadius:5,
        marginTop:7,
        padding:4
    },
    personalInfoTitle:{
        fontSize:16,
        fontWeight:"bold",
        alignSelf:"center",
        position:"absolute",
        top:screenHeight*0.1,
        color:"#8F8F8F"

    },
    personelInfoButton:{
        width:screenHeight*0.1,
        
        borderRadius:5,
        marginTop:15,
        padding:4,
        alignItems:"center",
        backgroundColor:"#FFAF1A",
    }

 
})
