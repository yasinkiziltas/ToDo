import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Animated,
    TouchableHighlight,
    Alert,
} from 'react-native'
import Modal from 'react-native-modal';
import firebase from 'firebase'
import { useTheme } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Drawer, DefaultTheme } from 'react-native-paper'
import CustomHeader from '../CustomHeader'
import { SwipeListView } from 'react-native-swipe-list-view'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Tab, Tabs, Icon, TabHeading } from 'native-base';

import PersonalTodo from './PersonalTodo'
import BusinessTodo from './BusinessTodo'

export default function HomeScreen({ navigation }) {
    const [todos, setTodos] = useState([])
    const [deleted, setDeleted] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [currentDate, setCurrentDate] = useState('');
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


    const { container, containerTitle, containerText, iconButton, iconText, row, rowText } = styles;

    const fetchUser = async () => {
        await firebase.firestore()
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

    const fetchTodos = async () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        setCurrentDate(date + '/' + month + '/' + year);
        console.log(currentDate)

        await firebase.firestore()
            .collection("todos")
            .doc(firebase.auth().currentUser.uid)
            .collection("userTodos")
            .where('todoTime', '==', currentDate)
            .get()
            .then((snapshot) => {
                let todos = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    const todo = doc.data().todo;
                    return {
                        id,
                        ...data
                    }

                })
                setTodos(todos)
                console.log(todos)
            })
    }

    const handleDelete = (todoId) => {
        Alert.alert(
            'Delete todo',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed!'),
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => deleteTodo(todoId),
                },
            ],
            { cancelable: false },
        );
    };

    const deleteTodo = async (todoId) => {
        console.log('Current todo Id: ', todoId);

        await firebase.firestore()
            .collection("todos")
            .doc(firebase.auth().currentUser.uid)
            .collection("userTodos")
            .doc(todoId)
            .delete()
            .then(() => {
                Alert.alert(
                    'Todo deleted!',
                    'Your todo has been deleted successfully!',
                );
                setDeleted(true)
            })
            .catch((e) => console.log('Error deleting todo.', e));
    };

    useEffect(() => {
        fetchTodos()
        fetchUser()
        setDeleted(false)

        console.log(currentDate)
    }, [deleted])


    return (
        <SafeAreaView style={container}>
            <StatusBar hidden />
            <CustomHeader title="" navigation={navigation} isHome={true} />

            <View style={containerTitle}>
                <Text style={[containerText, { color: colors.text }]}>What's up,  {userName}!</Text>
            </View>

            {/* locked */}
            <Tabs tabBarUnderlineStyle={{ borderBottomWidth: 4, borderBottomColor: '#2E9298' }}>
                <Tab
                    heading={<TabHeading style={{ backgroundColor: colors.border }}>
                        <MaterialCommunityIcons style={{ color: colors.text }} name="account" size={25} />
                        <Text style={{ color: colors.text }}> Personal</Text>
                    </TabHeading>}
                    style={{ backgroundColor: colors.card, }}
                >

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                        {
                            todos.length > 0 ?
                                <Text style={{ color: colors.text, padding: 10, fontWeight: 'bold' }}>TODAY TASKS</Text>
                                :
                                <Drawer.Section title="NO TASKS" style={{ alignItems: 'center' }} />
                        }

                        <View style={{ flexDirection: 'row', alignItems: 'center', width: 200, }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
                        </View>

                        <FlatList
                            style={{ width: '100%' }}
                            numColumns={1}
                            horizontal={false}
                            data={todos}
                            renderItem={({ item }) => (
                                <PersonalTodo
                                    item={item}
                                    onDelete={handleDelete}
                                />
                            )}
                        />

                    </View>
                </Tab>

                <Tab
                    heading={<TabHeading style={{ backgroundColor: colors.border }}>
                        <MaterialCommunityIcons style={{ color: colors.text }} name="card-account-details-outline" size={25} />
                        <Text style={{ color: colors.text }}>  Business</Text>
                    </TabHeading>}
                    style={{ backgroundColor: colors.card, }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 25, }}>
                        {
                            todos.length > 0 ?
                                <Text style={{ color: colors.text, padding: 10, fontWeight: 'bold' }}>TODAY TASKS</Text>
                                :
                                <Drawer.Section title="NO TASKS" style={{ alignItems: 'center' }} />
                        }

                        <View style={{ flexDirection: 'row', alignItems: 'center', width: 200, backgroundColor: 'gray' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
                        </View>

                        <FlatList
                            style={{ width: '100%', }}
                            numColumns={1}
                            horizontal={false}
                            data={todos}
                            renderItem={({ item }) => (
                                <BusinessTodo
                                    item={item}
                                    onDelete={handleDelete}
                                />
                            )}
                        />

                    </View>


                </Tab>

            </Tabs>

            <TouchableOpacity style={iconButton} onPress={() => navigation.navigate('Add')}>
                <Ionicons size={35} name="add" style={iconText} />
            </TouchableOpacity>

        </SafeAreaView>

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
