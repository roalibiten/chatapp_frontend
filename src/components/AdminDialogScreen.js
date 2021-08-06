import React, { Component } from 'react'
import { Text, StyleSheet, View,ScrollView,Dimensions ,TextInput,Image, TouchableOpacity} from 'react-native'
import MessageBubble from './MessageBubble';
import SockJS from "sockjs-client"
import { Stomp } from '@stomp/stompjs';

var stompClient=null;

export default class AdminDialogScreen extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
           
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
            message:"",
            dialogId:0,

            


        };
      }
    
   
    async componentDidMount(){
        this.createComponents()

        var socket = new SockJS('http://localhost:8080/chat' );
                const _this=this;

                stompClient = Stomp.over(socket);
                stompClient.connect({}, function(frame) {
                    //setConnected(true);
                    console.log('Connected: ' + frame);
                    stompClient.subscribe('/topic', function (message) {
                        console.log(message);
                        _this.receivedNewMessage(JSON.parse(message.body));
                    });
                });
    }

    receivedNewMessage(message){
        console.log("YENI MESAJ"+message+this.props.name+message.from)
        var dialogs=this.state.dialogs;
        if(this.props.name==message.sender){
            var lastMesssage={from:message.sender,message:message.message,time:"14.30"}
            dialogs.push(lastMesssage);
            this.setState({
                dialogs
            })
            this.createComponents()
        }
       
    }

    sendMessage(){

        var message={
            from:this.state.usersName,
            message:this.state.message
        }


            stompClient.send("/toUser", {},
                JSON.stringify({'sender':"employee", 'message':this.state.message,"sendTo":"user"})
            );
            console.log("sended")

        this.setState({
            dialogs:this.state.dialogs.push(message),
            message:""
        })

        this.createComponents()

        
        
    }

    createComponents(){
        console.log("dialogs"+this.state.dialogs[0])
        var components=this.state.components
        var messageBox;
        for(var x in this.state.dialogs){
                messageBox=(
                   
                        <MessageBubble
                            from={this.state.dialogs[x].from}
                            message={this.state.dialogs[x].message}
                            screen="employeeScreen"
                            time={this.state.dialogs[x].time}

                        />
                )
                components.push(messageBox);
        }
        console.log(components)
        this.setState({
            components,
            dialogs:[]
        })





    }

    render() {
        console.log(this.state.components)
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <Text style={styles.nameText}> {this.props.name} </Text>
                </View>

                <ScrollView >
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
        )
    }
}
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        width:screenWidth*0.5,
        height:screenHeight*0.9,

    },
    topBar:{
        width:screenWidth*0.5,
        height:screenHeight*0.06,
        justifyContent:"center",
        paddingLeft:10,
        backgroundColor:"#FFAF1A",

        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    nameText:{
        fontWeight:"bold"
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
    inputView:{
        width:screenWidth*0.45,
        height:screenHeight*0.05,
        justifyContent:"center",
        paddingHorizontal:6,
        marginBottom:6,

        

    },
})
