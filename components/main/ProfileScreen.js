import React from 'react'
import { View, Text, Button } from 'react-native'
import firebase from 'firebase'


const signOut = () => {
    try {
        firebase.auth().signOut();
        console.log('Logout success')
    } catch (error) {
        console.log(error)
    }
}

export default function ProfileScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile</Text>
            <Button title="Logout" onPress={() => signOut()} />
        </View>
    )
}
