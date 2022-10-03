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
} from "react-native";

import { Fruit } from "../redux/slices/FruitSlice"

interface FruitCardProps {
    fruit: Fruit
}

const FruitCardCustomer = ({ fruit }: FruitCardProps) => {

    const { name, _id, price, score, imgUrl, stock } = fruit

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

  return (
    <View
        style={{
            backgroundColor: "#fff",
            padding: 10,
            marginVertical: 15,
            width: windowWidth * 0.9,
            display: "flex",
            alignItems: "center",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        }}
    >
        <Image 
            style={{
                width: windowWidth * 0.8, 
                height: windowWidth * 0.6,
            }} 
            resizeMode="contain"
            source={{ uri: imgUrl }} 
        />
        <Text
            style={{
                fontSize: 20,
                fontWeight: "700",
                marginBottom: 5
            }}
        >
            { name }
        </Text>

        <Text
            style={{
                fontSize: 18,
                fontWeight: "500",
                marginBottom: 10
            }}
        >
            { "$" + price.toFixed(2) + " EUR" }
        </Text>

        <Text
            style={{
                fontSize: 18,
                fontWeight: "500",
                marginBottom: 10
            }}
        >
            { "Available: " + stock }
        </Text>
        
        <TouchableOpacity
            style={{
                width: windowWidth * 0.7,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: "#46a97b",
                marginBottom: 5
            }}
        >
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 22, textAlign: "center" }}>Buy</Text>
        </TouchableOpacity>

    </View>
  )
}

export default FruitCardCustomer