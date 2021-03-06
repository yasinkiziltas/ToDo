import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { windowHeight, windowWidth } from '../utils/Dimentions';

export default function FormInput({ labelValue, placeholderText, iconType, ...rest }) {
    return (
        <View>
            <View style={styles.inputContainer}>
                <TextInput
                    value={labelValue}
                    style={styles.input}
                    numberOfLines={1}
                    placeholder={placeholderText}
                    placeholderTextColor="#666"
                    {...rest}
                />
                <View style={styles.iconStyle}>
                    <AntDesign name={iconType} size={25} color="#666" />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    inputContainer: {
        borderBottomWidth: 1,
        borderColor: '#029571',
        marginTop: 5,
        marginBottom: 10,
        width: '90%',
        height: windowHeight / 15,
        // borderColor: '#ccc',
        borderRadius: 13,
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#fff',
    },
    iconStyle: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',

        width: 50,
    },
    input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: windowWidth / 1.5,
        height: windowHeight / 15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
    },
});
