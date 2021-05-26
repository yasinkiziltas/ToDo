import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import FormButton from '../FormButton'
import FormInput from '../FormInput'
import firebase from 'firebase'
import * as Animatable from 'react-native-animatable';


export default function ForgotPasswordScreen({ navigation }) {

    const [email, setEmail] = useState();

    const { container, forgotButton, forgotText, signInText, registerButton, registerButtonText, registerButtonTextInput } = styles;


    const forgotPassword = (Email) => {
        firebase.auth().sendPasswordResetEmail(Email)
            .then(function (user) {
                alert('Please check your email...')
            }).catch(function (e) {
                console.log(e)
            })
    }

    return (
        <Animatable.View animation="zoomInUp" style={container}>
            {/* <View>
                <Image source={require('../../assets/img/signin.png')}
                    resizeMode="contain"
                    style={styles.logo}
                />
            </View> */}

            <Text style={signInText}>Reset password</Text>

            <KeyboardAvoidingView style={{ justifyContent: 'center', alignItems: 'center', }} behavior="padding" keyboardVerticalOffset={100}>
                <FormInput
                    labelValue={email}
                    onChangeText={(userEmail) => setEmail(userEmail)}
                    placeholderText="Email"
                    iconType="mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <FormButton
                    buttonTitle="Submit"
                    onPress={() => forgotPassword(email)}
                />
            </KeyboardAvoidingView>




            <TouchableOpacity style={forgotButton} onPress={() => navigation.goBack()}>
                <Text style={forgotText}>Go back</Text>
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
        width: 200,
        height: 200
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
    registerButtonTextInput: {
        fontWeight: 'bold',
    }

});