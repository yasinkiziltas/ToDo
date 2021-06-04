import React, { useState } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import FormButton from '../FormButton'
import FormInput from '../FormInput'
import firebase from 'firebase'
import * as Animatable from 'react-native-animatable';
import { Formik } from 'formik'
import * as Yup from 'yup'


export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { container, forgotButton, forgotText, signInText, registerButton, registerButtonText, registerButtonTextInput } = styles;


    // const signIn = () => {
    //     firebase.auth().signInWithEmailAndPassword(email, password)
    //         .then((result) => {
    //             console.log('Success login!: ', result)
    //         })
    //         .catch((error) => {
    //             console.log('Error: ', error)
    //         })
    // }

    const handleSubmit = values => {
        firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .then((result) => {
                console.log('Success login!: ', result)
            })
            .catch((error) => {
                console.log('Error: ', error)
            })
    }


    return (
        <Formik
            initialValues={{ email, password }}
            onSubmit={handleSubmit}
            validationSchema={
                Yup.object().shape({
                    email: Yup.string()
                        .email()
                        .required(),

                    password: Yup.string()
                        .min(7, 'Password is too short - should be 7 chars minimum')
                        .required('No password provided.')
                })
            }
        >
            {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched }) => (
                <Animatable.View animation="fadeInUpBig" style={container}>

                    <Animatable.View animation="fadeInRightBig">
                        <Image source={require('../../assets/img/signin2.png')}
                            resizeMode="contain"
                            style={styles.logo}
                        />
                    </Animatable.View>

                    {/* <Text style={signInText}>Sign In to continue</Text> */}

                    <KeyboardAvoidingView style={{ justifyContent: 'center', alignItems: 'center', }} behavior="padding" keyboardVerticalOffset={2}>
                        <FormInput
                            onBlur={() => setFieldTouched('email')}
                            labelValue={values.email}
                            onChangeText={handleChange('email')}
                            //  onChangeText={(userEmail) => setEmail(userEmail)}
                            placeholderText="Email"
                            iconType="mail"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        {(errors.email && touched.email) && <Text style={{ color: 'red', fontWeight: 'bold' }}>{errors.email}</Text>}

                        <FormInput
                            onBlur={() => setFieldTouched('password')}
                            labelValue={values.password}
                            onChangeText={handleChange('password')}
                            //  onChangeText={(userPassword) => setPassword(userPassword)}
                            placeholderText="Password"
                            iconType="lock"
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        {(errors.password && touched.password) && <Text style={{ color: 'red', fontWeight: 'bold' }}>{errors.password}</Text>}

                        <FormButton
                            buttonTitle="Sign In"
                            onPress={() => handleSubmit()}
                        />
                    </KeyboardAvoidingView>




                    <TouchableOpacity style={forgotButton} onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={registerButton} onPress={() => navigation.navigate('Register')}>
                        <Text style={registerButtonText}>Dont have any account? <Text style={registerButtonTextInput}>Register</Text></Text>
                    </TouchableOpacity>

                </Animatable.View >
            )}
        </Formik>
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
        width: 180,
        height: 180
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