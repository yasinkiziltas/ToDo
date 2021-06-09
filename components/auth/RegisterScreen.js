import React, { useState, useRef } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import FormButton from '../FormButton'
import FormInput from '../FormInput'
import firebase from 'firebase'
import * as Animatable from 'react-native-animatable';
import { Formik } from 'formik'
import * as Yup from 'yup'

export default function RegisterScreen({ navigation }) {

    const [name, setName] = useState();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [uploadImg, setUploadImg] = useState()
    const [password, setPassword] = useState();

    const { container, registerButton, registerButtonText } = styles;

    const handleSubmit = values => {
        firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name: values.name,
                        // userName,
                        email: values.email,
                        password: values.password,
                        uploadImg: null
                    })
                console.log('New user: ', result)
            })
            .catch((error) => {
                alert(error)
            })
    }

    return (
        <Formik
            initialValues={{ name, email, password }}
            onSubmit={handleSubmit}
            validationSchema={
                Yup.object().shape({

                    name: Yup.string()
                        .required(),

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
                <Animatable.View style={container} animation="fadeInUpBig">

                    <Animatable.View animation="fadeInLeftBig">
                        <Image source={require('../../assets/img/signup2.png')}
                            resizeMode="contain"
                            style={styles.logo}
                        />
                    </Animatable.View>

                    {/* <Text style={signInText}>Sign Up to continue</Text> */}

                    <KeyboardAvoidingView style={{ justifyContent: 'center', alignItems: 'center', }} behavior="padding" keyboardVerticalOffset={2}>

                        <FormInput
                            onBlur={() => setFieldTouched('name')}
                            labelValue={values.name}
                            onChangeText={handleChange('name')}
                            placeholderText="Name"
                            iconType="user"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        {(errors.name && touched.name) && <Text style={{ color: 'red', fontWeight: 'bold' }}>{errors.name}</Text>}

                        {/* <FormInput
                         labelValue={userName}
                         onChangeText={(userName) => setUserName(userName)}
                         placeholderText="User Name"
                         iconType="user"
                         autoCapitalize="none"
                        autoCorrect={false}
                        /> */}

                        <FormInput
                            onBlur={() => setFieldTouched('email')}
                            labelValue={values.email}
                            onChangeText={handleChange('email')}
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
                            placeholderText="Password"
                            iconType="lock"
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        {(errors.password && touched.password) && <Text style={{ color: 'red', fontWeight: 'bold' }}>{errors.password}</Text>}

                        <FormButton
                            buttonTitle="Register"
                            onPress={() => handleSubmit()}
                        />

                    </KeyboardAvoidingView>

                    <TouchableOpacity style={registerButton} onPress={() => navigation.goBack()}>
                        <Text style={registerButtonText}>Go Back</Text>
                    </TouchableOpacity>

                </Animatable.View >
            )}

        </Formik>

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
        bottom: 20,
    },
    registerButtonText: {
        fontWeight: 'bold',
        color: "#5882FD",
        fontSize: 16,
    }

});