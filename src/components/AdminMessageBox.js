import React, { Component } from 'react'
import { Text, StyleSheet, View ,Dimensions,ScrollView,TouchableOpacity} from 'react-native'

import MessageBubble from './MessageBubble';
import UserView from './UserView';

export default class AdminMessageBox extends Component {

    constructor(props) {
        super(props);
  
        this.state = {
            username:"",
            password:"",
            loged:"false",

            users:[{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},
                    {name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},{name:"James HARDEN", lastMessage:"What is the solution about your mac m1 external display problem?"},
                    {name:"Steph Curry", lastMessage:"What tha fuck is harden saying man?"},
            ],
            usersComponents:[],


        };
      }

    
    componentDidMount(){
        this.createUsersView()
    }

    createUsersView(){
        var usersComponents=this.state.usersComponents
        var userView;
        for(var x in this.state.users){
            userView=(
                    <TouchableOpacity>
                        <UserView
                            name={this.state.users[x].name}
                            lastMessage={this.state.users[x].lastMessage}

                        />
                    </TouchableOpacity>
                )
                usersComponents.push(userView);
        }

        this.setState({
            usersComponents,
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

                    </View>


                    <View style={styles.personalInfoView}>

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
        backgroundColor:"#FFAF1A",
        borderRadius:7,
        borderTopRightRadius:0,
        borderBottomRightRadius:0,
        paddingBottom:7,
        borderEndWidth:3,
        borderColor:"#ECECEC"


    },
    messageView:{
        width:screenWidth*0.5,
        height:screenHeight*0.9,
        borderEndWidth:3,
        borderColor:"#B0B0B0"
      
    },
    personalInfoView:{
        width:screenWidth*0.2,
        height:screenHeight*0.9,
        backgroundColor:"black",
        borderRadius:7,
        borderTopLeftRadius:0,
        borderBottomLeftRadius:0
    },

})
