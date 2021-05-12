import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { windowHeight, windowWidth } from '../utils/Dimentions';

export default function FormButton({ buttonTitle, ...rest }) {
    return (
        <TouchableOpacity {...rest} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '90%',
        height: windowHeight / 15,
        backgroundColor: '#5882FD',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});