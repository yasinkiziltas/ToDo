import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, ImageBackground, Text, SafeAreaView, TextInput } from 'react-native'
import CustomHeader from '../CustomHeader'
import {
    Avatar,
    Title,
    Caption,
    Text as PaperText,
    TouchableRipple,
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import firebase from 'firebase'
import { useTheme } from '@react-navigation/native'


export default function EditProfileScreen({ navigation }) {
    const [name, setName] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const { colors } = useTheme();

    const fetchUser = () => {
        firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    const name = snapshot.data().name;
                    const username = snapshot.data().userName;
                    const email = snapshot.data().email;

                    setName(name)
                    setUserName(username)
                    setUserEmail(email)
                }
                else (
                    console.log('Lütfen kayıt olduğunuz kullanıcı ile giriniz, firebase tarafında el ile eklediniğiniz değil!')
                )

            })
    }


    useEffect(() => {
        fetchUser()
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader title="Edit Profile" navigation={navigation} />

            <View style={{ margin: 20 }}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity>
                        <View style={{ height: 100, width: 100, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <ImageBackground source={require('../../assets/img/avatar.png')} style={{ height: 100, width: 100 }} imageStyle={{ borderRadius: 15 }}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                    <Icon name="camera" color="#fff" size={30} style={{
                                        opacity: 0.7,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: "#fff",
                                        borderRadius: 35
                                    }} />
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>

                    <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 18 }}>{name}</Text>

                    <View style={styles.action}>
                        <FontAwesome name="user-o" size={20} style={{ color: colors.text }} />
                        <TextInput
                            placeholder="Name..."
                            style={styles.textInput}
                            placeholderTextColor={colors.text}
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.action}>
                        <FontAwesome name="user-o" size={20} style={{ color: colors.text }} />
                        <TextInput
                            placeholder="Username.."
                            style={styles.textInput}
                            placeholderTextColor={colors.text}
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.action}>
                        <FontAwesome name="envelope-o" size={20} style={{ color: colors.text }} />
                        <TextInput
                            placeholder="Email.."
                            style={styles.textInput}
                            keyboardType="email-address"
                            placeholderTextColor={colors.text}
                            autoCorrect={false}
                        />
                    </View>
                </View>

                <TouchableOpacity onPress={() => { }} style={styles.commandButton}>
                    <Text style={styles.panelButtonTitle}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
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
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        // marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
});