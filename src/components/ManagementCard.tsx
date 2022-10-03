import React, { useState } from 'react';
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
import StockManagerCard from './StockManagerCard';

interface FruitCompleted {
    _id: string
    name: string,
    imgUrl: string,
    price: number,
    score: number,
    stock: number,
    cityId: string,
    cityName: string 
}

interface GroupProperties {
    cityName: string,
    cityId: string,
    fruits: FruitCompleted[]
}

interface ManagementCardProps {
    group: GroupProperties
}

const ManagementCard = ({ group }: ManagementCardProps) => {

    const { cityName, cityId, fruits } = group;

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;



  return (
    <View
        style={{
            backgroundColor: "#fff",
            width: windowWidth * 0.9,
            display: "flex",
            marginVertical: 10,
            padding: 10,
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
        <Text style={{ fontSize: 28, fontWeight: "700"}} >{cityName}</Text>
        {
            fruits.map((fruit, index) => {
                return(
                    <StockManagerCard key={ index } fruit={ fruit } />
                )
            })
        }
    </View>
  )
}

export default ManagementCard