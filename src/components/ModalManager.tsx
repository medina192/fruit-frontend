import React, { useState } from 'react'
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
    TextInput
} from "react-native";

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../redux/store';
import { login, logout } from '../redux/slices/UserSlice';
import { setCities, setCitySelected } from '../redux/slices/CitySlice';
import { setFruits, setFruitSelected } from '../redux/slices/FruitSlice';
import { setModalValue } from '../redux/slices/ModalSlice';

import { backendUrl } from '../utils/connectionBackend';
import axios from "axios";


const ModalManager = ({ setUpdateStock, updateStock}: any) => {

    const dispatch = useAppDispatch()

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [quantityInpurIsFocused, setQuantityInpurIsFocused] = useState<boolean>(false);
    const [quantityToSend, setQuantityToSend] = useState<string>("")

    const { fruits, fruitSelected } =  useSelector((state: RootState) => state.fruit);
    const { cities, citySelected } =  useSelector((state: RootState) => state.city);

    const [citiesToShowAsRadioButtons , setCitiesToShowAsRadioButtons ] = useState(cities.slice().map((city) => {
        return {...city, label: city.name, value: city._id}
    }).filter(city => city.name !== citySelected.name))

    const [citySelectedModalId, setCitySelectedModalId] = useState({})


    const sendFruit = () => {
        console.log({
            remitentCityId: citySelected._id,
            destinataryCityId: cities.filter(city => city._id === citySelectedModalId)[0]._id,
            fruitId: fruitSelected._id,
            quantity: parseInt(quantityToSend)
        })
        axios.post(`${backendUrl}/api/fruit/send-fruit`, { 
            remitentCityId: citySelected._id,
            destinataryCityId: cities.filter(city => city._id === citySelectedModalId)[0]._id,
            fruitId: fruitSelected._id,
            quantity: parseInt(quantityToSend)
         } )
        .then(function (response) {
            setUpdateStock(!updateStock)
            dispatch(setModalValue({
                showModal: false
            }));
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return (
        <View
            style={{
                backgroundColor: "#000000aa",
                width: windowWidth,
                height: windowHeight,
                position: "absolute",
                left: 0,
                top: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 5
            }}
        >
            <View
                style={{
                    width: windowWidth * 0.75,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    padding: 20 
                }}
            >
                <Text style={{ fontSize: 24, marginBottom: 10, color: "#388530"}}>{ "From " + citySelected.name }</Text>
                <TextInput
                    style={{
                        borderColor: "#388530" ,
                        backgroundColor: quantityInpurIsFocused ? "#89d3a266" : "#fff",
                        borderWidth: 1,
                        fontSize: 20,
                        paddingHorizontal: 8,
                        paddingVertical: 10,
                        borderRadius: 7,
                        marginBottom: 12
                    }}
                    onFocus={() => setQuantityInpurIsFocused(true)}
                    onBlur={() => setQuantityInpurIsFocused(false)}
                    onChangeText={(value) => setQuantityToSend(value)}
                    placeholder="Number of fruits to send"
                    keyboardType="numeric"
                >
                </TextInput>
 
                <Text style={{ fontSize: 24, marginBottom: 10, color: "#388530"}}>{ "to" }</Text>
 
                <RadioForm
                    formHorizontal={false}
                    animation={true}
                    >
                    {/* To create radio buttons, loop through your array of options */}
                    {
                    citiesToShowAsRadioButtons .map((city, i) => (
                        <RadioButton labelHorizontal={true} key={i} >
                            {/*  You can set RadioButtonLabel before RadioButtonInput */}
                            <RadioButtonInput
                                obj={city}
                                index={i}
                                isSelected={city._id === citySelectedModalId}
                                onPress={(value) => setCitySelectedModalId(value)}
                                //borderWidth={1}
                                buttonInnerColor={"#388530"}
                                //buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                buttonSize={20}
                                buttonOuterSize={20}
                                buttonStyle={{}}
                                buttonWrapStyle={{marginLeft: 10, marginVertical: 5}}
                            />
                            <RadioButtonLabel
                                obj={city}
                                index={i}
                                labelHorizontal={true}
                                onPress={(value) => setCitySelectedModalId(value)}
                                labelStyle={{fontSize: 22, color: "#388530"}}
                                labelWrapStyle={{ marginTop: 5 }}
                            />
                    </RadioButton>
                    ))
                }  
                </RadioForm>

                <View
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: windowWidth * 0.7 - 40,
                        marginTop: 20
                    }}
                >

                    <TouchableOpacity
                        style={{
                            backgroundColor: "#fff",
                            width: windowWidth * 0.5,
                            paddingVertical: 14,
                            marginBottom: 15,
                            borderRadius: 30,
                            borderColor: "#46a97b",
                            borderWidth: 2
                        }}
                        onPress={() => {
                            dispatch(setModalValue({
                                showModal: false
                            }));
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "700",
                                color: "#388530",
                                textAlign: "center"
                            }}
                        >
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#388530",
                            width: windowWidth * 0.5,
                            paddingVertical: 14,
                            borderRadius: 30
                        }}
                        onPress={sendFruit}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "700",
                                color: "#fff",
                                textAlign: "center"
                            }}
                        >
                            Send Fruit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ModalManager