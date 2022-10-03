import React from 'react';
import {
    SafeAreaView,
    Text,
    TouchableHighlight,
    View,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native"

const MainDiscount = () => {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;


  return (
    <View
        style={{
        display: "flex",
        alignItems: "center",
        width: windowWidth , 
        height: windowWidth * 0.53,
        marginTop: 20,
        }}
    
    >
        <View
        style={{

            width: windowWidth * 0.88, 
            height: windowWidth * 0.55,
            shadowColor: "#000",
            shadowOffset: {
            width: 0,
            height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            
            elevation: 4,
        }}
        >

        <View
            style={{
            width: windowWidth * 0.88, 
            height: windowWidth * 0.55,
            overflow: "hidden",
            borderRadius: 40,
            }}
        >
            <Image 
                style={{
                    width: "100%", 
                    height: windowWidth * 0.55,
                }} 
                resizeMode="contain"
                source={require('../images/discount.jpeg')} 
            />
        </View>

        </View>
    </View>
  )
}

export default MainDiscount