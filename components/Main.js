import React from 'react'
import { View, Text, Button } from 'react-native'
import firebase from 'firebase'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import HomeScreen from './main/HomeScreen'
import AddTodoScreen from './main/AddTodoScreen'
import ProfileScreen from './main/ProfileScreen'

const Tab = createMaterialBottomTabNavigator()

export default function Main() {
    return (
        <Tab.Navigator initialRouteName="Home" labeled={false}>
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={24} />
                    )
                }}
            />

            <Tab.Screen name="Add" component={AddTodoScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus" color={color} size={24} />
                    )
                }}
            />

            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={24} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}
