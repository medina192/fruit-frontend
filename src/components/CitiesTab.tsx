

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

import { backendUrl } from '../utils/connectionBackend';
import axios from "axios";

import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../redux/store';
import { setCities, setCitySelected } from '../redux/slices/CitySlice';
import { setFruits, setFruitSelected } from '../redux/slices/FruitSlice';

const CitiesTab = () => {

    const dispatch = useAppDispatch()

    const { cities, citySelected } =  useSelector((state: RootState) => state.city);

    const windowWidth = Dimensions.get('window').width;

    const updateFruits = (cityId: string) => {
        axios.post(`${backendUrl}/api/fruit//get-fruits-by-city`, { cityId } )
        .then(function (response) {
            const fruits = response.data.fruits;
            dispatch(setFruits({
              fruits,
              fruitSelected: fruits[0]
          }));
        })
        .catch(function (error) {
          console.log(error);
        });
      }

  return (
    <ScrollView
    horizontal={ true }
    showsHorizontalScrollIndicator={ false }
    style={{
      marginTop: 20
    }}
  >
    {
      cities.map((city, index) => {
        return(
          <TouchableOpacity
            key={ index }
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 15,
              paddingVertical: 18,
              width: windowWidth * 0.3,
              borderBottomWidth: 2,
              borderBottomColor: citySelected._id === city._id ? "#388530" : "#fff"
            }}
            onPress={() => {
              dispatch(setCities({
                cities,
                citySelected: city
              }));
              updateFruits(city._id);
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 20 }} > {city.name }</Text>
          </TouchableOpacity>
        )
      })
    }
  </ScrollView>
  )
}

export default CitiesTab