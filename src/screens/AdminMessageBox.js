import React, { Component } from 'react'
import { Text, StyleSheet, View ,Dimensions,ScrollView,TouchableOpacity,TextInput,Image} from 'react-native'
import SockJS from "sockjs-client"
import { Stomp } from '@stomp/stompjs';

import MessageBubble from '../components/MessageBubble';
import AdminUserView from '../components/AdminUserView';
import AdminDialogScreen from '../components/AdminDialogScreen';
import AdminUserInfo from '../components/AdminUserInfo';

var stompClient=null;


export default class AdminMessageBox extends Component {

    constructor(props) {
        super(props);
  
        this.state = {
            username:"",
            password:"",
            loged:"false",
            message:"",

            choosenUserName:"James HARDEN",


           
            AdminUserInfoComponent:(
                <AdminUserInfo name=""/>

            ),

            dialogId:0,
            
            usersComponents:[],
            username:"Lutfen konusmak icin birinin yazmasini bekleyiniz ve seciniz.",

            users:[] ,            
            components:[],
            message:"",
            dialogId:0,

        };
      }

    
   
    async componentDidMount(){
        this.createUsersView(this.state.users)
        var socket = new SockJS('http://localhost:8080/chat' );
                const _this=this;
                stompClient = Stomp.over(socket);
                stompClient.connect({}, function(frame) {
                    //setConnected(true);
                    console.log('Connected: ' + frame);
                    stompClient.subscribe('/topic', function (message) {
                       
                        console.log(JSON.parse(message.body));
                        
                        _this.receivedNewMessage(JSON.parse(message.body));
                    });
                });
    }

    receivedNewMessage(message){
        console.log("YENI MESAJ"+message)
        var lastMessage={from:message.sender, message:message.message,IP:message.ip,device:message.device}
        var users=this.state.users;
        var newSender=true;
        if(users.length>0){
            console.log("INSAN VAR")
        for(var x in users){

            if(users[x].name==lastMessage.from){
                console.log("SAME PERSOONN"+users[x].name+"--"+lastMessage.from)
                users[x].lastMessage=message.message
                users[x].messages.push(lastMessage)
                newSender=false
                if(users[x].name==this.state.username){
                    this.createComponent(lastMessage)

                }
            }
        }
        }
        if(newSender==true){
            var user={name:message.sender,messages:[{from:message.sender, message:message.message,IP:message.ip,device:message.device}],lastMessage:message.message}

            users.push(user)
            
        }


        this.setState({
            users
        })
        this.createUsersView(users)
        console.log(this.state.users)
    }
    createComponent(message){
        var components=this.state.components
        var messageBox=(
                   
                        <MessageBubble
                            from={message.from}
                            message={message.message}
                            screen="employeeScreen"
                            time={message.time}

                        />
                )
                components.push(messageBox);
            
        
        console.log(components)
        this.setState({
            components,

        })
    }
    createComponents(){
        var components=[]
        
        var messageBox;
        for(var x in this.state.users){
                console.log("TAMAM")
                if(this.state.users[x]==this.state.username){
            for(var y in this.state.users[x].messages){
                messageBox=(
                   
                        <MessageBubble
                            from={this.state.users[x].messages[y].from}
                            message={this.state.users[x].messages[y].message}
                            screen="employeeScreen"
                            IP={this.state.users[x].messages[this.state.users[x].messages.length-1].IP}
                            device={this.state.users[x].messages[this.state.users[x].messages.length-1].device}

                            time={this.state.users[x].messages[y].time}

                        />
                )
                components.push(messageBox);
            }}
        }
        console.log(components)
        this.setState({
            components,
            dialogs:[],

        })
        
    }

    createUsersView(users){
        var usersComponents=[]
        var userView;
       
        for(var x in users){
            
            userView=(
                   
                        <AdminUserView
                            name={users[x].name}
                            lastMessage={users[x].lastMessage}
                            changeDialog={(name,IP,device)=>{this.changeDialog(name,IP,device)}}
                            dialogId={users[x].dialogId}

                        />
                )
                usersComponents.push(userView);
        }

        

        this.setState({
            usersComponents,

        })



    }

    changeDialog(name,IP,device){
        
        console.log(name)
        if(name!=this.state.username){
            
            console.log(device+IP)
            this.setState({
                choosenUserName:name,
                username:name,
                AdminUserInfoComponent:(
                    <AdminUserInfo name={name} IP={IP} device={device}/>
    
                ),
                components:[]
            })
            this.createComponents();

        }
       

    }


    render() {

        return (
                <View style={styles.adminMessageBoxView}>

                    <View style={styles.usersView}>
                        <ScrollView>
                        {this.state.usersComponents}

                        </ScrollView>

                    </View>


                    <View style={styles.messageView}>
                    


                    <View style={styles.container}>
                        <View style={styles.topBar}>
                            <Text style={styles.nameText}> {this.state.username} </Text>
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



                    </View>


                    <View style={styles.personalInfoView}>

                    {this.state.AdminUserInfoComponent}

                    </View>

                </View>
        )
    }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({

    //
    adminMessageBoxView:{
        width:screenWidth*0.9,
        height:screenHeight*0.9,
        backgroundColor:"white",
        borderRadius:7,
        flexDirection:"row",
    },
    usersView:{
        width:screenWidth*0.2,
        height:screenHeight*0.9,
        borderRadius:7,
        borderTopRightRadius:0,
        borderBottomRightRadius:0,
        paddingBottom:7,
       
        paddingVertical:5,
        backgroundColor:"#E5E5E5",



    },
    messageView:{
        width:screenWidth*0.5,
        height:screenHeight*0.9,
        borderEndWidth:3,
        borderColor:"#B0B0B0",
      
    },
    personalInfoView:{
        width:screenWidth*0.2,
        height:screenHeight*0.9,
        backgroundColor:"black",
        borderRadius:7,
        borderTopLeftRadius:0,
        borderBottomLeftRadius:0,
        backgroundColor:"#ECECEC",

    },




    /////

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
