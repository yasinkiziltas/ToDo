import React from 'react'
import { View, Text } from 'react-native'
import { windowHeight, windowWidth } from '../utils/Dimentions';

export default function FormButton() {
    return (
        <TouchableOpacity {...rest} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: '#2e64e5',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'lato-regular',
    },
});