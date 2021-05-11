import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'


export default function LoginScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Login</Text>
            {/* <TouchableOpacity onPress={navigation.navigate('Register')}>
                <Text>Register</Text>
            </TouchableOpacity> */}
        </View>
    )
}
