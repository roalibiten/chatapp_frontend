import React, { Component } from 'react'
import { Text, StyleSheet, View ,Dimensions,ScrollView,TouchableOpacity} from 'react-native'
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


            AdminDialogScreenComponent:(
                <AdminDialogScreen name="Lutfen konusmak icin birinin yazmasini bekleyiniz ve seciniz."/>

            ),
            AdminUserInfoComponent:(
                <AdminUserInfo name=""/>

            ),

            dialogId:0,
            users:[
            ],
            usersComponents:[],


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
        var lastMessage={dialogId:1,name:message.sender, lastMessage:message.message,IP:message.ip,device:message.device}
        var users=this.state.users;
        var newSender=true;
        if(users.length>0){
            console.log("INSAN VAR")
        for(var x in users){

            if(users[x].name==lastMessage.name){
                console.log("SAME PERSOONN"+users[x].name+"--"+lastMessage.name)
                users[x].lastMessage=message.message
                newSender=false
            }
        }
        }
        if(newSender==true){
            users.push(lastMessage)
        }

        this.setState({
            users
        })
        this.createUsersView(users)
    }
   

    createUsersView(users){
        var usersComponents=[]
        var userView;
       
        for(var x in users){
            
            userView=(
                   
                        <AdminUserView
                            name={users[x].name}
                            lastMessage={users[x].lastMessage}
                            changeDialog={()=>{this.changeDialog(users[x].name,users[x].dialogId,users[x].IP,users[x].device)}}
                            dialogId={users[x].dialogId}

                        />
                )
                usersComponents.push(userView);
        }

        

        this.setState({
            usersComponents,

        })



    }

    changeDialog(name,dialogId,IP,device){
        console.log(device+IP)
        this.setState({
            choosenUserName:name,
            dialogId,
            AdminDialogScreenComponent:(
                <AdminDialogScreen name={name} dialogId={dialogId} IP={IP} device={device} />

            ),
            AdminUserInfoComponent:(
                <AdminUserInfo name={name} dialogId={dialogId} IP={IP} device={device}/>

            ),
        })
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
                        {this.state.AdminDialogScreenComponent}
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

})
