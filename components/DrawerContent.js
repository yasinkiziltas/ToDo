import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { DefaultTheme, DarkTheme } from '@react-navigation/native'
import { EventRegister } from 'react-native-event-listeners'
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper'

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase'
import { useTheme } from '@react-navigation/native'


const signOut = () => {
    try {
        firebase.auth().signOut();
        console.log('Logout success')
    } catch (error) {
        console.log(error)
    }
}


export default function DrawerContent(props) {

    const [darkMode, setIsDarkMode] = React.useState(false);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [todo, setTodo] = useState([]);
    const { colors } = useTheme()


    const fetchUser = () => {
        firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    const name = snapshot.data().name;
                    const email = snapshot.data().email;

                    setUserName(name)
                    setUserEmail(email)
                    // console.log(snapshot.data())

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


    useEffect(() => {
        fetchUser()
        fetchPosts()
    }, [])




    // const toggleTheme = () => {
    //     setIsDarkTheme(!isDarkTheme)
    // }

    return (
        <View style={{ flex: 1 }}>

            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>

                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={(require('../assets/img/avatar.png'))}
                                size={50}
                            />

                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={{ color: colors.text }}>{userName}</Title>
                                <Caption style={{ color: colors.text }}>{userEmail}</Caption>
                            </View>

                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption, { color: colors.text }]}>{todo.length}</Paragraph>
                            <Caption style={[styles.caption, { color: colors.text }]}>Todo</Caption>
                        </View>

                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption, { color: colors.text }]}>0</Paragraph>
                            <Caption style={[styles.caption, { color: colors.text }]}>Completed</Caption>
                        </View>
                    </View>
                </View>

                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="home-outline"
                                color={color}
                                size={size}
                            />
                        )}
                        onPress={() => props.navigation.navigate('Home')}
                        label="Home"
                    />

                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="note-plus-outline"
                                color={color}
                                size={size}
                            />
                        )}
                        onPress={() => props.navigation.navigate('Add')}
                        label="Add Todo"
                    />

                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="account"
                                color={color}
                                size={size}
                            />
                        )}
                        onPress={() => props.navigation.navigate('Profile')}
                        label="Profile"
                    />
                </Drawer.Section>

                {/* <Drawer.Section title="Preferences">
                    <TouchableRipple onPress={() => { toggleTheme() }}>
                        <View style={styles.preference}>
                            <Text>Dark Theme</Text>
                            <View pointerEvents="none">
                                <Switch value={isDarkTheme} />
                            </View>

                        </View>
                    </TouchableRipple>
                </Drawer.Section> */}

                <View style={styles.preference}>
                    <Text style={{ color: colors.text }}>Dark Mode</Text>
                    <Switch value={darkMode} onValueChange={(val) => {
                        setIsDarkMode(val);
                        EventRegister.emit('changeThemeEvent', val)
                    }} />
                </View>

            </DrawerContentScrollView>

            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    onPress={() => signOut()}
                    label="Sign Out"
                />
            </Drawer.Section>
        </View>
    )
}


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        paddingLeft: 20,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
