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



           
            AdminUserInfoComponent:(
                <AdminUserInfo name=""/>

            ),

            dialogId:0,
            
            usersComponents:[],

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
        var today = new Date()
        var date = today.getDate()+ '.' + (today.getMonth() + 1) + '.' + today.getFullYear()  
        var time = today.getHours() + '.' + today.getMinutes() 



        var lastMessage={from:message.sender, message:message.message,IP:message.ip,device:message.device,date: time+" "+date,time:time}
        console.log("YENI MESAJ"+lastMessage.IP)

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
             var user={name:message.sender,messages:[lastMessage],lastMessage:message.message}

            users.push(user)
            
        }


        this.setState({
            users
        })
        this.createUsersView(users)
        console.log("new message")
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
    createComponents(users){
        console.log("createComps")
        console.log(this.state.users)
        var components=[]
        
        var messageBox;
        for(var x in users){
                console.log("TAMAM")
                console.log(users[x].name+this.state.username)

                if(users[x].name==this.state.username){
                    console.log("name matched")

            for(var y in users[x].messages){
                messageBox=(
                   
                        <MessageBubble
                            from={users[x].messages[y].from}
                            message={users[x].messages[y].message}
                            screen="employeeScreen"
                            IP={users[x].messages[users[x].messages.length-1].IP}
                            device={users[x].messages[users[x].messages.length-1].device}

                            time={users[x].messages[y].time}

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
                            IP={users[x].messages[users[x].messages.length-1].IP}
                            device={users[x].messages[users[x].messages.length-1].device}
                            date={users[x].messages[users[x].messages.length-1].date}

                            changeDialog={(name,IP,device,date)=>{this.changeDialog(name,IP,device,date).then(()=>{            this.createComponents(this.state.users);
                            })}}
                            dialogId={users[x].dialogId}

                        />
                )
                usersComponents.push(userView);
        }

        

        this.setState({
            usersComponents,

        })



    }

    async changeDialog(name,IP,device,date){
        
        if(name!=this.state.username){
            
            console.log("lao"+device+IP)
            this.setState({
                username:name,
                AdminUserInfoComponent:(
                    <AdminUserInfo name={name} IP={IP} device={device} date={date}/>
    
                ),
                components:[]
            })
            //this.createComponents(this.state.users);

        }

       

    }

    sendMessage(){
        var today = new Date()
        var date = today.getDate()+ '.' + (today.getMonth() + 1) + '.' + today.getFullYear()  
        var time = today.getHours() + '.' + today.getMinutes() 



        var lastMessage={from:"employee", message:this.state.message,
        IP:"",device:"",
        date: time+" "+date,time:time}
        
        var message={
            sender:"employee",
            message:this.state.message,
            sendTo:this.state.username,
            
        }
        


            stompClient.send("/chat/"+this.state.username, {},
                JSON.stringify(message)
            
            );

        var users=this.state.users;
        for(var x in users){
            if(users[x].name==message.sendTo){
                users[x].messages.push(lastMessage)
            }
        }

        
        this.setState({
            users,
            message:""
        })
        this.createComponents(users)

        
        
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
