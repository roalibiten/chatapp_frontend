import React, { Component } from 'react'
import { Text, StyleSheet, View,TextInput,Dimensions,TouchableOpacity,Animated ,Image,ScrollView} from 'react-native'

import MessageBubble from './MessageBubble';
export default class MessageCard extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            opened:false,
            dialogs:[{from:"employee",message:"Merhaba! Hosgeldiniz."},{from:"user",message:"Merhaba!."},{from:"user",message:"Merhaba!."},{from:"employee",message:"Merhaba! Hosgeldiniz."},{from:"user",message:"Merhaba!."},{from:"employee",message:"Merhaba! Hosgeldiniz."},{from:"user",message:"Merhaba!."},{from:"employee",message:"Merhaba! Hosgeldiniz."},{from:"user",message:"Merhaba!."}],
            components:[],
            knownUser:false
        };

        this.yPosition=new Animated.Value(0);

    }

    componentDidMount(){
        this.createComponents()
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
        var components=[]
        var messageBox;
        for(var x in this.state.dialogs){
                messageBox=(
                   
                        <MessageBubble
                            from={this.state.dialogs[x].from}
                            message={this.state.dialogs[x].message}

                        />
                )
                components.push(messageBox);
        }

        this.setState({
            components
        })

        return this.state.components


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
<ScrollView style={styles.dialogView}>


{this.state.components}

</ScrollView>
<View style={styles.bottomBarView}>
 <TextInput
     style={styles.inputView}
     placeholder="Your Message"
 />
<TouchableOpacity style={{alignItems:"center",justifyContent:"center"}}>
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
                        <TextInput
                            placeholder="Ad Soyad"

                        />
                        <TextInput
                            placeholder="Mail Adresi"
                            
                        />
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

 
})
