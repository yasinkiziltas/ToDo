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
        // width: '90%',
        width: windowWidth / 1.1,
        height: windowHeight / 15,
        backgroundColor: '#029571',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});