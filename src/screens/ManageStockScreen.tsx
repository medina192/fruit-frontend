import React, { useState, useEffect } from 'react';
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

import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../redux/store';
import { login, logout } from '../redux/slices/UserSlice';
import { setCities, setCitySelected } from '../redux/slices/CitySlice';
import { setFruits, setFruitSelected } from '../redux/slices/FruitSlice';
import ContainerManagementCards from '../components/ContainerManagementCards';
import ModalManager from '../components/ModalManager';

import { backendUrl } from '../utils/connectionBackend';
import axios from "axios";


const ManageStockScreen = () => {

    const user = useSelector((state: RootState) => state.user);
    const { cities, citySelected } =  useSelector((state: RootState) => state.city);
    const { fruits, fruitSelected } =  useSelector((state: RootState) => state.fruit);
    const { showModal } =  useSelector((state: RootState) => state.modal);

    const [loading, setLoading] = useState<boolean>(false);

    const [fruitsGroupByCity, setFruitsGroupByCity] = useState([])
    const [updateStock, setUpdateStock] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(`${backendUrl}/api/fruit`, )
        .then(function (response) {
            const fruitsGrouped = response.data.groups;
            setFruitsGroupByCity(fruitsGrouped)
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => setLoading(false))

    }, [updateStock])

  return (
    <SafeAreaView
        style={{
            marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
            backgroundColor: "#f2f4f5",
            position: "relative"
        }}
    >

        <Text style={{ fontSize: 20, fontWeight: "700", marginVertical: 15, textAlign: "center"}}>
            {"Hi " + user.name}
        </Text>
        {
            //loading && <ActivityIndicator size="large" color="#00ff00" />
        }
        <ContainerManagementCards fruitsGroupByCity={ fruitsGroupByCity } />
        { showModal && <ModalManager setUpdateStock={ setUpdateStock } updateStock= { updateStock } />}
    </SafeAreaView>
  )
}

export default ManageStockScreen