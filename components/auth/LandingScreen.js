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
            title={"Skip"}
            color="#000000"
            {...props}
        />
    )
}

const Next = ({ ...props }) => {
    return (
        <Button
            title={"Next"}
            color="#000000"
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
            <Text style={{ fontSize: 16 }}>Done</Text>
        </TouchableOpacity>
    )
}


export default function LandingScreen({ navigation }) {
    return (
        <Onboarding
            onSkip={() => this.props.navigation.replace('Login')}
            onDone={() => navigation.navigate('Login')}
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            pages={[
                {
                    backgroundColor: '#a6e4d0',
                    image: <Image source={require('../../assets/img/onboarding-img2.png')} />,
                    title: " ToDo App",
                    subtitle: 'Plan your work and..'
                },

                {
                    backgroundColor: '#fdeb93',
                    image: <Image source={require('../../assets/img/todo2.png')} style={{ width: 240, height: 240 }} />,
                    // title: " ToDo App",
                    subtitle: 'Start working!'
                }

            ]}
        />
    )
}
