import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, SafeAreaView, Image, Text, Button, View } from 'react-native'
import firebase from 'firebase'
import CustomHeader from '../CustomHeader'
import {
    Avatar,
    Title,
    Caption,
    Text as PaperText,
    TouchableRipple
} from 'react-native-paper'
import { useTheme } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const signOut = () => {
    try {
        firebase.auth().signOut();
        console.log('Logout success')
    } catch (error) {
        console.log(error)
    }
}


export default function ProfileScreen({ navigation }) {
    const [name, setName] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [todo, setTodo] = useState([]);
    const { colors } = useTheme()

    const { container, userImg, userNameStyl } = styles;

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


    const fetchPosts = () => {
        try {
            firebase.firestore()
                .collection("todos")
                .doc(firebase.auth().currentUser.uid)
                .collection("userTodos")
                .get()
                .then((snapshot) => {
                    let todos = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return {
                            id,
                            ...data
                        }
                    })
                    setTodo(todos)
                })
        } catch (error) {
            console.log('Error: ', error)
        }

    }


    const signOut = () => {
        try {
            firebase.auth().signOut();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPosts()
        fetchUser()
    }, [])



    // 

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader title="" navigation={navigation} />

            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        source={require('../../assets/img/avatar.png')}
                        size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={{ color: colors.text, marginTop: 5 }}>
                            {
                                name ? <Text style={userNameStyl}>{name}</Text> : <Text style={userNameStyl}>Firebase tarafında eklenen kullanıcı;</Text>
                            }
                        </Title>

                        <TouchableRipple style={styles.iconButton} onPress={() => navigation.navigate('EditProfile')}>
                            <Text style={styles.iconText}>Edit Profile</Text>
                        </TouchableRipple>

                        {/* <Caption style={{ color: colors.text }}>Edit Profile</Caption> */}

                    </View>
                </View>
            </View>

            {/* <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('EditProfile')}>
                <Text style={styles.iconText}>Edit Profile</Text>
            </TouchableOpacity> */}

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="account" size={20} color="#777777" />
                    {userName ? <Text style={{ marginLeft: 20, color: "#777777" }}>{userName}</Text> : <Text>Boş</Text>}
                </View>

                <View style={styles.row}>
                    <Icon name="email" size={20} color="#777777" />
                    {userEmail ? <Text style={{ marginLeft: 20, color: "#777777" }}>{userEmail}</Text> : <Text>Boş</Text>}
                </View>
            </View>



            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: "#dddddd",
                    borderRightWidth: 1
                }]}>
                    <Title style={{ color: colors.text }}>{todo.length}</Title>
                    <Caption style={{ color: colors.text }}>Todo</Caption>
                </View>

                <View style={styles.infoBox}>
                    <Title style={{ color: colors.text }}>0</Title>
                    <Caption style={{ color: colors.text }}>Completed</Caption>
                </View>
            </View>

            <View style={styles.menuWrapper}>

                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="credit-card" size={25} color="#2E9298" />
                        <Text style={styles.menuItemText}>Payment</Text>
                    </View>
                </TouchableRipple>

                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="share-outline" size={25} color="#2E9298" />
                        <Text style={styles.menuItemText}>Tell your friends</Text>
                    </View>
                </TouchableRipple>

                <TouchableRipple onPress={() => navigation.navigate('EditProfile')}>
                    <View style={styles.menuItem}>
                        <Icon name="account-cog-outline" size={25} color="#2E9298" />
                        <Text style={styles.menuItemText}>Settings</Text>
                    </View>
                </TouchableRipple>

                <TouchableRipple onPress={() => signOut()}>
                    <View style={styles.menuItem}>
                        <Icon name="logout" size={25} color="#2E9298" />
                        <Text style={styles.menuItemText}>Sign Out</Text>
                    </View>
                </TouchableRipple>


            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
    iconButton: {
        marginTop: 5,
        backgroundColor: '#2E9298',
        borderRadius: 60,
        padding: 5,
    },
    iconText: {
        textAlign: 'center',
        color: 'white'
    },
});