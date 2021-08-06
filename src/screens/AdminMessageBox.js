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
                <AdminDialogScreen name="James HARDEN"/>

            ),
            AdminUserInfoComponent:(
                <AdminUserInfo name="James HARDEN"/>

            ),

            dialogId:0,
            users:[{dialogId:0,name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {dialogId:1,name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},
                    {dialogId:2,name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {dialogId:3,name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {dialogId:4,name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {dialogId:5,name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {dialogId:6,name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {dialogId:7,name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {dialogId:8,name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {dialogId:9,name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {dialogId:10,name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {dialogId:11,name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {dialogId:12,name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},
            ],
            usersComponents:[],


        };
      }

    
   
    async componentDidMount(){
        this.createUsersView()

        var socket = new SockJS('http://localhost:8080/chat' );
                stompClient = Stomp.over(socket);
                stompClient.connect({}, function(frame) {
                    //setConnected(true);
                    console.log('Connected: ' + frame);
                    stompClient.subscribe('/topic', function (message) {
                       
                        console.log(JSON.parse(message.body));

                        //handleReceivedMessage(JSON.parse(message.body));
                    });
                });
    }

   

    createUsersView(){
        var usersComponents=this.state.usersComponents
        var userView;
        var users=[];
       
        var itemId=0;
        for(var x in this.state.users){
            
            userView=(
                   
                        <AdminUserView
                            name={this.state.users[x].name}
                            lastMessage={this.state.users[x].lastMessage}
                            changeDialog={(x)=>{this.changeDialog(x)}}
                            dialogId={this.state.users[x].dialogId}

                        />
                )
                usersComponents.push(userView);
                itemId++;
        }

        this.setState({
            usersComponents,
        })



    }

    changeDialog(name,dialogId){
        this.setState({
            choosenUserName:name,
            dialogId,
            AdminDialogScreenComponent:(
                <AdminDialogScreen name={name} dialogId={dialogId}/>

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
