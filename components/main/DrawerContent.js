import React from 'react'
import { View, StyleSheet } from 'react-native'
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


const signOut = () => {
    try {
        firebase.auth().signOut();
        console.log('Logout success')
    } catch (error) {
        console.log(error)
    }
}


export default function DrawerContent(props) {

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme)
    }

    return (
        <View style={{ flex: 1 }}>

            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={(require('../../assets/img/avatar.png'))}
                                size={50}
                            />

                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title>Yasin Kızıltaş</Title>
                                <Caption>kzltayasin@gmail.com</Caption>
                            </View>

                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>5</Paragraph>
                            <Caption style={styles.caption}>Todo</Caption>
                        </View>

                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>4</Paragraph>
                            <Caption style={styles.caption}>Completed</Caption>
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

                <Drawer.Section title="Preferences">
                    <TouchableRipple onPress={() => { toggleTheme() }}>
                        <View style={styles.preference}>
                            <Text>Dark Theme</Text>
                            <View pointerEvents="none">
                                <Switch value={isDarkTheme} />
                            </View>

                        </View>
                    </TouchableRipple>
                </Drawer.Section>

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