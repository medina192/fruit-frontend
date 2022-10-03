import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    Text,
    TouchableHighlight,
    View,
    Platform,
    StatusBar,
    Image,
    Dimensions,
    Animated,
    TouchableOpacity,
    TextInput
} from "react-native";

import { backendUrl } from '../utils/connectionBackend';
import axios from "axios";

import { useSelector, useDispatch } from 'react-redux'
import { RootState, useAppDispatch } from '../redux/store';
import { login, logout } from '../redux/slices/UserSlice';
import { setCities, setCitySelected } from '../redux/slices/CitySlice';
import { setFruits, setFruitSelected } from '../redux/slices/FruitSlice';


const LoginScreen = ({ navigation } : any) => {

    const dispatch = useAppDispatch()

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const heightForm: number = windowHeight * 0.45;

    const animationImage = useRef(new Animated.Value(0)).current;
    const animationForm = useRef(new Animated.Value( heightForm )).current;

    const [emailInpurIsFocused, setEmailInpurIsFocused] = useState<boolean>(false);
    const [passwordInpurIsFocused, setPasswordInpurIsFocused] = useState<boolean>(false);

    const [emailInputValue, setEmailInputValue] = useState<string>("");
    const [passwordInputValue, setPasswordInputValue] = useState<string>("")

    const [openForm, setOpenForm] = useState<boolean>(false);

    const [loadingRequestLogin, setLoadingRequestLogin] = useState<boolean>(false)


    useEffect(() => {
        axios.get(`${backendUrl}/api/city`,)
          .then(function (response) {
              const cities = response.data.cities;
              updateFruits(cities[0]._id)
              dispatch(setCities({
                  cities,
                  citySelected: cities[0]
              }));
          })
          .catch(function (error) {
            console.log(error);
          });
    

    }, [])
    
    const updateFruits = (cityId: string) => {
        axios.post(`${backendUrl}/api/fruit/get-fruits-by-city`, { cityId } )
        .then(function (response) {
            const fruits = response.data.fruits;
            dispatch(setFruits({
                fruits,
                fruitSelected: fruits[0]
            }));
        })
        .catch(function (error) {
          console.log(error, error.response, error.response.data);
        });
    }
    
    const showForm = () => {
        setOpenForm(true)
        Animated.timing(
            animationImage, {
                toValue: -20,
                duration: 800,
                useNativeDriver: true,
            }
        ).start()

        Animated.timing(
            animationForm, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }
        ).start()
    }
    
    const hideForm = () => {
        
        setTimeout(() => {
            setOpenForm(false) 
        }, 1000);
        Animated.timing(
            animationImage, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }
        ).start()

        Animated.timing(
            animationForm, {
                toValue:  heightForm,
                duration: 800,
                useNativeDriver: true,
            }
        ).start()
    }
    
    const LogIn = () => {
        setLoadingRequestLogin(true)
        if(emailInputValue && passwordInputValue)
        {
            axios.post(`${backendUrl}/api/user/login`, {
                email: emailInputValue.toLowerCase(),
                password: passwordInputValue
              })
              .then(function (response) {
                  const userInfo = response.data.user;
                  dispatch(login({
                      isLogged: true,
                      name: userInfo.name,
                      email: userInfo.email,
                  }));
                  navigation.navigate("Manage")
              })
              .catch(function (error) {
                console.log(error);
              })
              .finally(() => setLoadingRequestLogin(false))
        }

    }

  return (
    <SafeAreaView
      style={{

        backgroundColor: "#89d3a2",
        position: "relative",
        width: windowWidth,
        height: windowHeight,
        overflow: "hidden"
      }}
    >
        <Animated.View
            style={{
                transform: [{ translateY: animationImage}]
            }}
        >
            <Image 
                style={{
                    width: windowWidth * 1, height: windowHeight * 0.72,
                    position: "absolute",
                }} 
                source={require('../images/pretty-avocado-transparent-phone.png')} 
                resizeMode="contain"
            />
        </Animated.View>

        {
            !openForm && 

            <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: 'center',
                    position: "absolute",
                    width: windowWidth,
                    left: 0,
                    bottom: 0,
                    zIndex: 2
                }}
            >

                <Text
                    style={{
                        color: "#fff",
                        fontSize: 18,
                        fontWeight: "600",
                        marginBottom: 10
                    }}
                >Are you a customer?</Text> 

                <TouchableOpacity
                    style={{
                        backgroundColor: "#fff",
                        width: windowWidth * 0.8,
                        paddingVertical: 14,
                        marginBottom: 18,
                        borderRadius: 30
                    }}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "700",
                            color: "#388530",
                            textAlign: "center"
                        }}
                    >
                        Continue to Buy
                    </Text>
                </TouchableOpacity>

                <Text
                    style={{
                        color: "#fff",
                        fontSize: 18,
                        fontWeight: "600",
                        marginBottom: 10
                    }}
                >Are you a manager?</Text>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#388530",
                        width: windowWidth * 0.8,
                        paddingVertical: 14,
                        marginBottom: 55,
                        borderRadius: 30
                    }}
                    onPress={showForm}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "700",
                            color: "#fff",
                            textAlign: "center"
                        }}
                    >
                        Sign In 
                    </Text>
                </TouchableOpacity>
            </View>
            }





            {
                // Form
            
            <View
                style={{
                    backgroundColor: "transparent",
                    position: "absolute",
                    width: windowWidth,
                    height: heightForm,
                    left: 0,
                    bottom: 0,
                    zIndex: 1
                }}
            >
                <Animated.View
                    style={{
                        backgroundColor: "transparent",
                        width: windowWidth,
                        height: heightForm,
                        display: "flex",
                        flexDirection: "column",
                        transform: [{ translateY: animationForm}]
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "transparent",
                            width: windowWidth,
                            height: windowHeight * 0.08,
                            display: "flex",
                            alignItems: "center",
                            position: "relative"
                            //overflow: "hidden",
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: "#fff",
                                width: windowWidth / 2,
                                height: windowWidth / 2,
                                borderRadius: windowWidth / 2,
                                transform: [{ scaleX: 2.5}]
                            }}
                        ></View>

                        <View
                            style={{
                                backgroundColor: "transparent",
                                position: "absolute",
                                top: -25,
                                left: 0,
                                right: 0,
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 4,
                                display: openForm ? "flex" : "none"
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: "#fff",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,

                                    elevation: 5,
                                }}
                                onPress={hideForm}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        textAlign: "center"
                                    }}
                                >
                                    x
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View
                        style={{
                            backgroundColor: "#fff",
                            flex: 1,
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <View
                            style={{
                                width: windowWidth * 0.8,
                                display: "flex"
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: "#388530",
                                    marginBottom: 6
                                }}
                            >
                                Email: 
                            </Text>

                            <TextInput
                                style={{
                                    borderColor: "#388530" ,
                                    backgroundColor: emailInpurIsFocused ? "#89d3a266" : "#fff",
                                    borderWidth: 1,
                                    fontSize: 20,
                                    paddingHorizontal: 8,
                                    paddingVertical: 10,
                                    borderRadius: 7,
                                    marginBottom: 15
                                }}
                                onFocus={() => setEmailInpurIsFocused(true)}
                                onBlur={() => setEmailInpurIsFocused(false)}
                                onChangeText={(value) => setEmailInputValue(value)}
                                placeholder="Email"
                            >
                            </TextInput>

                            <Text
                                style={{
                                    fontSize: 18,
                                    color: "#388530",
                                    marginBottom: 6
                                }}
                            >
                                Password: 
                            </Text>

                            <TextInput
                                secureTextEntry={true}
                                style={{
                                    borderColor: "#388530" ,
                                    backgroundColor: passwordInpurIsFocused ? "#89d3a266" : "#fff",
                                    borderWidth: 1,
                                    fontSize: 20,
                                    paddingHorizontal: 8,
                                    paddingVertical: 10,
                                    borderRadius: 7,
                                    marginBottom: 25
                                }}
                                onFocus={() => setPasswordInpurIsFocused(true)}
                                onBlur={() => setPasswordInpurIsFocused(false)}
                                onChangeText={(value) => setPasswordInputValue(value)}
                                placeholder="Password"
                            >
                            </TextInput>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#388530",
                                
                                    paddingVertical: 14,
                                    marginBottom: 55,
                                    borderRadius: 30
                                }}
                                onPress={LogIn}
                                disabled={loadingRequestLogin}
                            >
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "700",
                                        color: "#fff",
                                        textAlign: "center"
                                    }}
                                >
                                    { loadingRequestLogin ? "Loading..." : "Sign In"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </View>
        }
    </SafeAreaView>
  )
}

export default LoginScreen