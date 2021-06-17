import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';


const Dots = ({ selected }) => {
    let backgroundColor;
    backgroundColor = selected ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)'

    return (
        <View style={{ width: 5, height: 5, marginHorizontal: 3, backgroundColor }}>

        </View>
    )
}

const Skip = ({ ...props }) => {
    return (
        <Button
            title={""}
            color="black"
            {...props}
        />
    )
}

const Next = ({ ...props }) => {
    return (
        <Button
            title={""}
            color="black"
            {...props}
        />
    )
}

const Done = ({ ...props }) => {
    return (
        <TouchableOpacity
            style={{ marginHorizontal: 8 }}
            {...props}
        >
            <Text style={{ fontSize: 20, color: "black" }}>Done</Text>
        </TouchableOpacity>
    )
}


export default function LandingScreen({ navigation }) {
    return (
        <Onboarding
            onSkip={() => navigation.replace('Login')}
            onDone={() => navigation.navigate('Login')}
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            pages={[
                {
                    backgroundColor: '#a6e4d0',
                    image: <Image source={require('../../assets/img/onboarding-img2.png')} />,
                    title: "Plan your work and",
                    subtitle: '',

                },

                {
                    backgroundColor: '#fdeb93',
                    image: <Image source={require('../../assets/img/onboarding-img1.png')} />,
                    title: "Start working!",
                    subtitle: ''
                }

            ]}
        />
    )
}
