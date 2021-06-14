import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Alert, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import CustomHeader from '../CustomHeader'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase'
import { useTheme } from '@react-navigation/native'

export default function UpdatePasswordScreen({ navigation }) {
    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('');
    const { colors } = useTheme();
    var user = firebase.auth().currentUser;

    const {
        container,
        commandButton,
        panelButtonTitle,
        action,
        contentContainer,
        textInput,
        forgotButton,
        forgotText
    } = styles;

    const reauthenticate = (currentPassword) => {
        var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword)
        return user.reauthenticateWithCredential(cred)
    }

    const changePassword = () => {

        if (!currentPassword.trim()) {
            alert('Please enter current password..')
            return;
        }

        if (!password.trim()) {
            alert('Please enter new password..')
            return;
        }

        reauthenticate(currentPassword).then(() => {
            user.updatePassword(password)
                .then(() => {
                    alert('Password changed!')
                })
                .catch((error) => {
                    alert(error)
                })
        }).catch((error) => {
            alert(error.message)
        })


    }

    return (
        <View style={container}>
            <CustomHeader title="Change Password" navigation={navigation} isBack={true} />

            <KeyboardAvoidingView style={contentContainer} behavior={"padding"} keyboardVerticalOffset={5}>

                <View style={action}>
                    <MaterialCommunityIcons name="lock-outline" size={30} style={{ color: colors.text, marginLeft: 5 }} />
                    <TextInput
                        secureTextEntry={true}
                        value={currentPassword}
                        onChangeText={(txt) => setCurrentPassword(txt)}
                        placeholder="Current password..."
                        style={[textInput, { color: colors.text }]}
                        placeholderTextColor={colors.text}
                        autoCorrect={false}
                    />

                </View>

                <View style={action}>
                    <MaterialCommunityIcons name="lock-outline" size={30} style={{ color: colors.text, marginLeft: 5 }} />
                    <TextInput
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(txt) => setPassword(txt)}
                        placeholder="New password..."
                        style={[textInput, { color: colors.text }]}
                        placeholderTextColor={colors.text}
                        autoCorrect={false}
                    />

                </View>

                <TouchableOpacity onPress={() => changePassword()} style={commandButton}>
                    <Text style={panelButtonTitle}>Change Password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={forgotButton} onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 15 : null
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#2E9298',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },

    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        marginTop: 25,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        marginLeft: 5,
        flex: 1,
        // marginTop: Platform.OS === 'ios' ? 20 : -12,
        color: '#05375a',
        // textAlign: 'center',
        borderEndWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
    forgotButton: {
        marginVertical: 35,
    },
    forgotText: {
        color: "#5882FD",
        fontSize: 15,
        textAlign: 'center'
    },
});