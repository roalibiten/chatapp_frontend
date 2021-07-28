import React, { Component } from 'react'
import { Text, StyleSheet, View,TextInput,Dimensions,TouchableOpacity,Animated ,Image} from 'react-native'

export default class MessageCard extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            opened:false,

        };

        this.yPosition=new Animated.Value(-screenHeight*0.55);

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
                  toValue: -screenHeight*0.55,
                  duration: 750,
                }
              ).start(()=>{
                this.setState({
                    opened:false
                })
            });
              
        }
        
    }

    render() {
        
        return (
            <Animated.View style={[styles.container,{bottom:this.yPosition}]}>
                
                <TouchableOpacity style={styles.topBarView}
                    onPress={()=>{this.animation()}}
                >
                    <Text> Canlı Destek </Text>
                </TouchableOpacity>

                  <View style={styles.chatView}>
                  <View style={styles.dialogView}>
                      <Text> sa </Text>
                  </View>
                  <View style={styles.bottomBarView}>
                      <TextInput
                          style={styles.inputView}
                          placeholder="Your Message"
                      />
                       <Image
                  source={{
                      uri: 'https://image.flaticon.com/icons/png/512/1933/1933005.png',
                    }}
                  style={styles.image}
                  resizeMode="center"
              />
                  </View>
                  
                  
              </View>
              

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
        height:screenHeight*0.6,
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
    }
})
