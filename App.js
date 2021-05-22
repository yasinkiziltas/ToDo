import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper'

import { createStackNavigator } from '@react-navigation/stack'

import LandingScreen from './components/auth/LandingScreen'
import LoginScreen from './components/auth/LoginScreen'
import RegisterScreen from './components/auth/RegisterScreen'

import HomeScreen from './components/main/HomeScreen'
import MainScreen from './components/Main'

import firebase from 'firebase'
import { EventRegister } from 'react-native-event-listeners';


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

        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                setLoggedIn(false)
                setLoaded(true)
            }

            else {
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

        // return(
        //     EventRegister.removeEventListener(eventListener)
        // )
    }, [])

    if (!loaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <ActivityIndicator size={35} />
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
                </Stack.Navigator>
            </NavigationContainer>
        )
    }

    return (
        <NavigationContainer theme={appTheme}>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>


    )
}
