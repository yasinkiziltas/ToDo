import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, Share, Text, View } from 'react-native'
import firebase from 'firebase'
import CustomHeader from '../CustomHeader'
import {
    Avatar,
    Title,
    Caption,
    Text as PaperText,
    TouchableRipple,
    ActivityIndicator
} from 'react-native-paper'
import { useTheme } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function ProfileScreen({ navigation }) {
    const [name, setName] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [img, setImg] = useState(null);
    const [todo, setTodo] = useState([]);
    const [todosPersonal, setTodosPersonal] = useState([]);
    const [todosBusiness, setTodosBusiness] = useState([]);
    const { colors } = useTheme()

    const { container, userImg, userNameStyl } = styles;

    const onShare = () => {
        const result = Share.share({
            title: 'App link',
            message: 'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
            url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en' //https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    }

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
                    const userImg = snapshot.data().uploadImg;

                    setName(name)
                    setUserName(username)
                    setUserEmail(email)
                    setImg(userImg)
                }
                else (
                    console.log('L??tfen kay??t oldu??unuz kullan??c?? ile giriniz, firebase taraf??nda el ile ekledini??iniz de??il!')
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

    const fetchPostsPersonal = () => {
        try {
            firebase.firestore()
                .collection("todos")
                .doc(firebase.auth().currentUser.uid)
                .collection("userTodos")
                .where('todoType', '==', 'Personal')
                .get()
                .then((snapshot) => {
                    let personalTodos = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return {
                            id,
                            ...data
                        }
                    })
                    setTodosPersonal(personalTodos)
                })
        } catch (error) {
            console.log('Error: ', error)
        }

    }

    const fetchPostsBusiness = () => {
        try {
            firebase.firestore()
                .collection("todos")
                .doc(firebase.auth().currentUser.uid)
                .collection("userTodos")
                .where('todoType', '==', 'Business')
                .get()
                .then((snapshot) => {
                    let businessTodos = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return {
                            id,
                            ...data
                        }
                    })
                    setTodosBusiness(businessTodos)
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
        fetchPostsPersonal()
        fetchPostsBusiness()
        fetchUser()
    }, [])



    // 

    return (
        <SafeAreaView style={styles.container}>
            <CustomHeader title="Profile" navigation={navigation} isBack={true} />

            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    {
                        img
                            ?
                            <Avatar.Image
                                source={{ uri: img }}
                                size={80}
                            />

                            :
                            <ActivityIndicator size={20} style={userNameStyl}>
                                <Avatar.Image
                                    source={require('../../assets/img/user.png')}
                                    size={80}
                                />
                            </ActivityIndicator>


                    }

                    <View style={{ marginLeft: 20 }}>
                        <Title style={{ color: colors.text, marginTop: 5 }}>
                            {
                                name ? <Text style={userNameStyl}>{name}</Text> : <ActivityIndicator size={20} style={userNameStyl} />
                            }
                        </Title>

                        <TouchableRipple style={styles.iconButton} onPress={() => navigation.navigate('EditProfile')}>
                            <Text style={styles.iconText}>Edit Profile</Text>
                        </TouchableRipple>

                    </View>

                </View>
            </View>

            {/* <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('EditProfile')}>
                <Text style={styles.iconText}>Edit Profile</Text>
            </TouchableOpacity> */}

            {/* <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="account" size={20} color="#777777" />
                    {userName ? <Text style={{ marginLeft: 20, color: "#777777" }}>{name}</Text> : <Text>Bo??</Text>}
                </View>

                <View style={styles.row}>
                    <Icon name="email" size={20} color="#777777" />
                    {userEmail ? <Text style={{ marginLeft: 20, color: "#777777" }}>{userEmail}</Text> : <Text>Bo??</Text>}
                </View>
            </View> */}



            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: "#dddddd",
                    borderRightWidth: 1
                }]}>
                    <Title style={{ color: colors.text }}>{todosPersonal.length}</Title>
                    <Caption style={{ color: colors.text, padding: 5 }}>Personal Todo</Caption>
                    {/* {
                        todosPersonal || todosBusiness != null
                            ?

                            <Caption style={[{ fontWeight: 'bold', color: colors.border, position: 'absolute', bottom: 10, flexDirection: 'row', borderBottomColor: '#2E9298', borderBottomWidth: 0.2 }]}>({todosPersonal.length} personal, {todosBusiness.length} business)</Caption>

                            :

                            null
                    } */}

                    {/* <Title style={{ color: colors.text }}>{todosPersonal.length}</Title>
                    <Caption style={{ color: colors.text, padding: 5 }}>Personal</Caption>

                    <Title style={{ color: colors.text }}>{todosBusiness.length}</Title>
                    <Caption style={{ color: colors.text, padding: 5 }}>Business</Caption> */}
                </View>

                <View style={styles.infoBox}>
                    <Title style={{ color: colors.text, padding: 5 }}>{todosBusiness.length}</Title>
                    <Caption style={{ color: colors.text }}>Business Todo</Caption>
                </View>
            </View>

            <View style={styles.menuWrapper}>

                {/* <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <Icon name="credit-card" size={25} color="#2E9298" />
                        <Text style={styles.menuItemText}>Payment</Text>
                    </View>
                </TouchableRipple> */}

                <TouchableRipple onPress={() => onShare()}>
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

            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '', fontStyle: 'italic', fontSize: 9, fontWeight: 'bold' }}>V.01</Text>
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
        flexDirection: 'row',
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