import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LandingScreen from './components/auth/LandingScreen'
import LoginScreen from './components/auth/LoginScreen'
import RegisterScreen from './components/auth/RegisterScreen'

import HomeScreen from './components/main/HomeScreen'

import firebase from 'firebase'


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

  const [loaded, setLoaded] = useState(null)
  const [loggedIn, setLoggedIn] = useState(null)

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
  }, [])


  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <Text>Loading..</Text>
      </View>
    )
  }



  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </NavigationContainer>
    )

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
