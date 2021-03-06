import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';

import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'

import { createStackNavigator } from '@react-navigation/stack'

import LandingScreen from './components/auth/LandingScreen'
import LoginScreen from './components/auth/LoginScreen'
import RegisterScreen from './components/auth/RegisterScreen'

import MainScreen from './components/Main'

import firebase from 'firebase'
import { EventRegister } from 'react-native-event-listeners';

import LottieView from 'lottie-react-native';
import ForgotPasswordScreen from './components/auth/ForgotPasswordScreen';

import { Spinner } from 'native-base';

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'

const firebaseConfig = {
    apiKey: "AIzaSyAT5NsVt7pm-JZagSKZtrKP1FZZCQeQbU4",
    authDomain: "todo-d0b60.firebaseapp.com",
    projectId: "todo-d0b60",
    storageBucket: "todo-d0b60.appspot.com",
    messagingSenderId: "175167771348",
    appId: "1:175167771348:web:a99d55c23426e98d8da141"
};


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App() {

    const [loaded, setLoaded] = useState(false)
    const [loggedIn, setLoggedIn] = useState(null)
    const [darkApp, setDarkApp] = useState(false)
    const appTheme = darkApp ? DarkTheme : DefaultTheme;

    useEffect(() => {



        setTimeout(() => {
            firebase.auth().onAuthStateChanged((user) => {
                if (!user) {
                    setLoggedIn(false)
                    setLoaded(true)
                }

                else {
                    registerForPushNotification()
                        .then(token => console.log(token))
                        .catch(err => console.log(err))
                    setLoggedIn(true)
                    setLoaded(true)
                }
            })

            let eventListener = EventRegister.addEventListener(
                'changeThemeEvent',
                data => {
                    setDarkApp(data)
                }
            )

        }, 2500)


        async function registerForPushNotification() {
            const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)

            if (status != 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
            }

            if (status != 'granted') {
                alert('Fail to get the push token')
                return;
            }

            token = (await Notifications.getExpoPushTokenAsync()).data;
            return token;
        }



        // return(
        //     EventRegister.removeEventListener(eventListener)
        // )
    }, [])

    if (!loaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <LottieView source={require('./assets/img/todoLaunch.json')} autoPlay loop />
                {/* <ActivityIndicator size={35} /> */}
                <Spinner color='#2E9298' size={25} style={{ marginTop: 35 }} />
            </View>
        )
    }


    if (!loggedIn) {
        return (
            <NavigationContainer theme={appTheme}>
                <Stack.Navigator initialRouteName="Landing">
                    <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

    return (
        <NavigationContainer theme={appTheme}>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
