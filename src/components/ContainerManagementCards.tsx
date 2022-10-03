import React, { useState, useEffect} from 'react';
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
    TouchableOpacity,
    ActivityIndicator
} from "react-native";

import { backendUrl } from '../utils/connectionBackend';
import axios from "axios";

import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../redux/store';
import { login, logout } from '../redux/slices/UserSlice';
import { setCities, setCitySelected } from '../redux/slices/CitySlice';
import { setFruits, setFruitSelected } from '../redux/slices/FruitSlice';
import FruitCardCustomer from './FruitCardCustomer';
import ManagementCard from './ManagementCard';

import { io } from "socket.io-client";
const socket = io(backendUrl);

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

interface ContainerManagementCardsProps {
    fruitsGroupByCity: GroupProperties[]
}

const ContainerManagementCards = ({ fruitsGroupByCity }: ContainerManagementCardsProps) => {

    const dispatch = useAppDispatch()
  
    const { cities, citySelected } =  useSelector((state: RootState) => state.city);
    const { fruits, fruitSelected } =  useSelector((state: RootState) => state.fruit);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;




  return (
    <View
        style={{
            backgroundColor: "#f2f4f5",
            display: "flex",
            alignItems: "center"
        }}
    >
        <ScrollView
            showsVerticalScrollIndicator={ false }
        >

        {
            fruitsGroupByCity.map((group, index): any => {
                return (
                    <ManagementCard key={index} group={group}/>
                )
            })
        }
        </ScrollView>
    </View>
  )
}

export default ContainerManagementCards