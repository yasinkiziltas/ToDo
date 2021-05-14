import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import FormButton from '../FormButton'
import FormInput from '../FormInput'
import firebase from 'firebase'
import * as Animatable from 'react-native-animatable';


export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { container, forgotButton, forgotText, signInText, registerButton, registerButtonText, registerButtonTextInput} = styles;



    const signIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log('Success login: ', result)
            })
            .catch((error) => {
                console.log('Error login: ', error)
            })
    }

    return (
        <Animatable.View animation="fadeInDownBig" style={container}>
            <View>
                <Image source={require('../../assets/img/signin.png')}
                    resizeMode="contain"
                    style={styles.logo}
                />
            </View>

            <Text style={signInText}>Sign In to continue</Text>

            
            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="mail"
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

            <TouchableOpacity style={registerButton} onPress={() => navigation.navigate('Register')}>
                <Text style={registerButtonText}>Dont have any account? <Text style={registerButtonTextInput}>Register</Text></Text>
            </TouchableOpacity>

        </Animatable.View >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 20,
        // paddingTop: 50
    },
    logo: {
        width: 250,
        height: 250
    },
    forgotText: {
        color: "#5882FD",
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
        // right: 90,
        bottom: 20,
    },
    registerButtonText: {     
        color: "#5882FD",
        fontSize: 16,
    },
    registerButtonTextInput:{
        fontWeight: 'bold',
    }

});