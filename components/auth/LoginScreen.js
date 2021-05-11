import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import FormButton from '../FormButton'
import FormInput from '../FormInput'
import firebase from 'firebase'
import { windowHeight, windowWidth } from '../../utils/Dimentions';

export default function LoginScreen() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { container, forgotButton, forgotText, signInText, registerButton, registerButtonText } = styles;

    return (
        <View style={container}>
            <View>
                <Image source={require('../../assets/img/todo2.png')}
                    resizeMode="contain"
                    style={styles.logo}
                />
            </View>

            <Text style={signInText}>Sign In to continue</Text>

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
                buttonTitle="Sign In"
                onPress={() => signIn()}
            />

            <TouchableOpacity style={forgotButton} onPress={() => { }}>
                <Text style={forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={registerButton} onPress={() => { }}>
                <Text style={registerButtonText}>Dont have any account? Register</Text>
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
        fontSize: 12
    },
    signInText: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 15
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
        fontSize: 16,
    }

});