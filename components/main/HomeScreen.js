import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import Modal from 'react-native-modal';
import firebase from 'firebase'
import { useTheme } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Drawer, DefaultTheme } from 'react-native-paper'
import CustomHeader from '../CustomHeader'
import { Tab, Tabs, Icon, TabHeading } from 'native-base';

import PersonalTodo from './PersonalTodo'
import BusinessTodo from './BusinessTodo'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function HomeScreen({ navigation }) {
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const { colors } = useTheme()

    const theme = {
        ...DefaultTheme,
        roundness: 3,
        colors: {
            ...DefaultTheme.colors,
            primary: 'black',
            accent: 'white',
        },
    };


    const tabsSettings = {
        uppercase: false,
        // iconPosition: "top",
        theme: theme,
    }

    const tabIcon = () => {
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
            <View>
                <MaterialCommunityIcons name="account" size={30} color="red" />
            </View>
        </View>

    }


    const { container, containerTitle, containerText, iconButton, iconText } = styles;

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

    useEffect(() => {
        fetchUser()
    }, [])


    return (
        <SafeAreaView style={container}>
            <StatusBar hidden />
            <CustomHeader title="" navigation={navigation} isHome={true} />

            <View style={containerTitle}>
                <Text style={[containerText, { color: colors.text }]}>What's up,  {userName}!</Text>
            </View>

            {/* <Drawer.Section title="MY TASKS" style={{ alignItems: 'center' }} /> */}

            <Tabs locked tabBarUnderlineStyle={{ borderBottomWidth: 4, borderBottomColor: '#2E9298' }}>
                <Tab
                    heading={<TabHeading style={{ backgroundColor: colors.border }}>
                        <MaterialCommunityIcons style={{ color: colors.text }} name="account" size={25} />
                        <Text style={{ color: colors.text }}> Personal</Text>
                    </TabHeading>}
                    style={{ backgroundColor: colors.card, }}
                >
                    {/* <Drawer.Section title="MY PERSONAL TASKS" style={{ alignItems: 'center' }} /> */}
                    <PersonalTodo />
                </Tab>

                <Tab
                    heading={<TabHeading style={{ backgroundColor: colors.border }}>
                        <MaterialCommunityIcons style={{ color: colors.text }} name="card-account-details-outline" size={25} />
                        <Text style={{ color: colors.text }}> Business</Text>
                    </TabHeading>}
                    style={{ backgroundColor: colors.card, }}
                >
                    <BusinessTodo />
                </Tab>

            </Tabs>


            <TouchableOpacity style={iconButton} onPress={() => navigation.navigate('Add')}>
                <Ionicons size={35} name="add" style={iconText} />
            </TouchableOpacity>

        </SafeAreaView >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerTitle: {
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 20
    },
    containerText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    todoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconButton: {
        backgroundColor: '#2E9298',
        borderRadius: 40,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowRadius: 15,
        shadowOpacity: 0.50,
        position: 'absolute',
        bottom: 35,
        right: 15,
    },
    iconText: {
        color: 'white'
    },
})


/* <Modal isVisible={isModalVisible} style={styles.modalView}>
                <View style={{ flex: 1 }}>
                    <Button
                        style={{ flex: 1 }}
                        title="Hoşgeldiniz!"
                        onPress={toggleModal} />
                </View>
            </Modal> */


            // const styles = StyleSheet.create({
            //     modalView: {
            //         margin: 20,
            //         alignItems: "center",
            //         shadowColor: "#000",
            //         shadowOffset: {
            //             width: 0,
            //             height: 2
            //         },
            //         shadowOpacity: 0.25,
            //         shadowRadius: 4,
            //         elevation: 5
            //     }
            // })
