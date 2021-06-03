import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import FormButton from '../FormButton'
import FormInput from '../FormInput'
import firebase from 'firebase'
import * as Animatable from 'react-native-animatable';
import { Formik } from 'formik'
import * as Yup from 'yup'


export default function ForgotPasswordScreen({ navigation }) {

    const [email, setEmail] = useState();

    const { container, forgotButton, forgotText } = styles;

    const handleSubmit = values => {
        firebase.auth().sendPasswordResetEmail(values.email)
            .then(function (user) {
                alert('Please check your email...')
            }).catch(function (e) {
                console.log(e)
            })
    }


    return (
        <Animatable.View animation="fadeInLeft" style={container}>

            <Animatable.View animation="fadeInRight">
                <Image source={require('../../assets/img/reset.png')}
                    resizeMode="contain"
                    style={styles.logo}
                />
            </Animatable.View>

            {/* <Text style={signInText}>Reset password</Text> */}

            <Formik
                initialValues={{ email }}
                onSubmit={handleSubmit}
                validationSchema={
                    Yup.object().shape({
                        email: Yup.string()
                            .email()
                            .required()
                    })
                }
            >
                {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched }) => (
                    <KeyboardAvoidingView style={{ justifyContent: 'center', alignItems: 'center', }} behavior="padding" keyboardVerticalOffset={100}>
                        <FormInput
                            labelValue={values.email}
                            // onChangeText={(userEmail) => setEmail(userEmail)}
                            onChangeText={handleChange('email')}
                            onBlur={() => setFieldTouched('email')}
                            placeholderText="Email"
                            iconType="mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        { (errors.email && touched.email) && <Text style={{ color: 'red', fontWeight: 'bold' }}>{errors.email}</Text>}

                        <FormButton
                            buttonTitle="Submit"
                            onPress={() => handleSubmit()}
                        />
                    </KeyboardAvoidingView>
                )}


            </Formik>


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
        width: 150,
        height: 150,
        marginBottom: 10,
    },
    forgotText: {
        color: "#5882FD",
        fontSize: 15
    },
    signInText: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 10
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