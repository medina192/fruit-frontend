import React, { useEffect } from 'react';
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

import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../redux/store';
import { login, logout } from '../redux/slices/UserSlice';
import { setCities, setCitySelected } from '../redux/slices/CitySlice';
import { setFruits, setFruitSelected } from '../redux/slices/FruitSlice';

import { backendUrl } from '../utils/connectionBackend';
import axios from "axios";
import CitiesTab from '../components/CitiesTab';
import MainDiscount from '../components/MainDiscount';
import ContainerFruitsCards from '../components/ContainerFruitsCards';

const HomeScreen = () => {

  const dispatch = useAppDispatch()
  
  const user = useSelector((state: RootState) => state.user);
  const { cities, citySelected } =  useSelector((state: RootState) => state.city);
  const { fruits, fruitSelected } =  useSelector((state: RootState) => state.fruit);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;


  return (
    <SafeAreaView
      style={{
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        backgroundColor: "#fff"
      }}
    >
      <ScrollView>

        <MainDiscount />
        <CitiesTab />
        <ContainerFruitsCards />

      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen