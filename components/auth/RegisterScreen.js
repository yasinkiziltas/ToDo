import React, { useState, useRef } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import FormButton from '../FormButton'
import FormInput from '../FormInput'
import firebase from 'firebase'
import * as Animatable from 'react-native-animatable';

export default function RegisterScreen({ navigation }) {

    const [name, setName] = useState();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { container, signInText, registerButton, registerButtonText } = styles;

    const signUp = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        userName,
                        email,
                    })
                console.log('New user: ', result)
            })
            .catch((error) => {
                console.log('Error: ', error)
            })
    }

    return (
        <Animatable.View style={container} animation="fadeInUpBig">
            <View>
                <Image source={require('../../assets/img/register.png')}
                    resizeMode="contain"
                    style={styles.logo}
                />
            </View>

            <Text style={signInText}>Sign Up to continue</Text>

            <KeyboardAvoidingView style={{ justifyContent: 'center', alignItems: 'center', }} behavior="padding" keyboardVerticalOffset={120}>

                <FormInput
                    labelValue={name}
                    onChangeText={(userName) => setName(userName)}
                    placeholderText="Name"
                    iconType="user"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <FormInput
                    labelValue={userName}
                    onChangeText={(userName) => setUserName(userName)}
                    placeholderText="User Name"
                    iconType="user"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

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
                    buttonTitle="Register"
                    onPress={() => signUp()}
                />

            </KeyboardAvoidingView>


            <TouchableOpacity style={registerButton} onPress={() => navigation.goBack()}>
                <Text style={registerButtonText}>Go Back</Text>
            </TouchableOpacity>

        </Animatable.View >
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
        height: 150,
        marginBottom: 15
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
        bottom: 50,
    },
    registerButtonText: {
        fontWeight: 'bold',
        color: "#5882FD",
        fontSize: 16,
    }

});