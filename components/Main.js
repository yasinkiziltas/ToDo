import React, { useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import HomeScreen from './main/HomeScreen'
import AddTodoScreen from './main/AddTodoScreen'
import ProfileScreen from './main/ProfileScreen'
import EditProfileScreen from './main/EditProfileScreen'
import SearchScreen from './main/SearchScreen'
import UpdatePasswordScreen from './main/UpdatePasswordScreen'

import DrawerContent from './DrawerContent'

const Tab = createMaterialBottomTabNavigator()
const Drawer = createDrawerNavigator()

// const EmptyScreen = () => {
//     return (null)
// }

export default function Main() {

    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />} >

            <Drawer.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={24} />
                    )
                }}
            />

            <Drawer.Screen name="Add" component={AddTodoScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus" color={color} size={24} />
                    )
                }}
            />

            <Drawer.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={24} />
                    )
                }}
            />

            <Drawer.Screen name="EditProfile" component={EditProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={24} />
                    )
                }}
            />

            <Drawer.Screen name="Search" component={SearchScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={24} />
                    )
                }}
            />

            <Drawer.Screen name="UpdatePassword" component={UpdatePasswordScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={24} />
                    )
                }}
            />

        </Drawer.Navigator>
    )

    {/* <Drawer.Screen name="Search" component={EmptyScreen}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Search")
                    }
                })}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={24} />
                    )
                }}
            />

        </Drawer.Navigator>
    ) */}
}
