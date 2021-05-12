import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import FormButton from '../FormButton'
import FormInput from '../FormInput'
import firebase from 'firebase'
import { windowHeight, windowWidth } from '../../utils/Dimentions';
import { NavigationContainer } from '@react-navigation/native'

export default function RegisterScreen({ navigation }) {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { container, forgotButton, forgotText, signInText, registerButton, registerButtonText } = styles;

    return (
        <View style={container}>
            <View>
                <Image source={require('../../assets/img/todo.png')}
                    resizeMode="contain"
                    style={styles.logo}
                />
            </View>

            <Text style={signInText}>Sign Up to continue</Text>

            <FormInput
                labelValue={name}
                onChangeText={(userName) => setName(userName)}
                placeholderText="Name"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false}
            />



            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormButton
                buttonTitle="Register"
                onPress={() => register()}
            />

            <TouchableOpacity style={registerButton} onPress={() => navigation.goBack()}>
                <Text style={registerButtonText}>Go Back</Text>
            </TouchableOpacity>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 20,
        // paddingTop: 50
    },
    logo: {
        width: 150,
        height: 150
    },
    forgotText: {
        color: "#7209F6",
        fontSize: 15
    },
    signInText: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 25
    },
    forgotButton: {
        marginVertical: 35,
    },
    registerButton: {
        position: 'absolute',
        margin: 16,
        right: 90,
        bottom: 20,
    },
    registerButtonText: {
        fontWeight: 'bold',
        color: "#7209F6",
        fontSize: 16,
    }

});