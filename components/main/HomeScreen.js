import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert,
    ScrollView
} from 'react-native'
import firebase from 'firebase'
import { useTheme } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Drawer, DefaultTheme, ActivityIndicator } from 'react-native-paper'
import CustomHeader from '../CustomHeader'
import { SwipeListView } from 'react-native-swipe-list-view'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Tab, Tabs, Icon, TabHeading } from 'native-base';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import PersonalTodo from './PersonalTodo'
import BusinessTodo from './BusinessTodo'

export default function HomeScreen({ navigation }) {
    const [todos, setTodos] = useState([])
    const [deleted, setDeleted] = useState(null)
    const [loading, setLoading] = useState(true)
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
                    console.log('L??tfen kay??t oldu??unuz kullan??c?? ile giriniz, firebase taraf??nda el ile ekledini??iniz de??il!')
                )

            })
    }

    const fetchTodos = async () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        setCurrentDate(year + '-' + '0' + month + '-' + date);
        // console.log(currentDate)

        const list = []

        await firebase.firestore()
            .collection("todos")
            .doc(firebase.auth().currentUser.uid)
            .collection("userTodos")
            .where('date', '==', currentDate)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    const { date, title, todo, todoTime, todoType, userId } = doc.data();
                    list.push({
                        id: doc.id,
                        date,
                        title,
                        todo,
                        todoTime,
                        todoType,
                        userId
                    })
                })
            })
        setTodos(list)

        if (loading) {
            setLoading(false)
        }
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

    }, [deleted, todos])


    return (
        <SafeAreaView style={container}>

            <StatusBar hidden />
            <CustomHeader title="" navigation={navigation} isHome={true} />

            {
                loading ?
                    <View style={containerTitle}>
                        <ActivityIndicator size="medium" color="#2E9298" />
                    </View>

                    :
                    <View style={containerTitle}>
                        <Text style={[containerText, { color: colors.text }]}>What's up,  {userName}!</Text>
                    </View>
            }

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
                            // && todos.todoTime == currentDate 
                            todos.length > 0 ?
                                <Text style={{ color: colors.text, padding: 10, fontWeight: 'bold' }}>TODAY TASKS</Text>
                                :
                                <Drawer.Section title="NO TASKS" style={{ alignItems: 'center' }} />
                        }

                        <View style={{ flexDirection: 'row', alignItems: 'center', width: 200, }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
                        </View>

                        {
                            loading ?
                                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center', }}>
                                    <ActivityIndicator size={25} style={{ marginTop: 5 }} />
                                    <SkeletonPlaceholder>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                            <View style={{ marginLeft: 20 }}>
                                                <View style={{ width: 300, height: 30, borderRadius: 4 }} />
                                                <View style={{ marginTop: 6, width: 300, height: 30, borderRadius: 4 }} />
                                            </View>
                                        </View>
                                    </SkeletonPlaceholder>
                                </ScrollView>
                                :
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

                        }

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
                            // && todos.todoTime == currentDate
                            todos.length > 0 ?
                                <Text style={{ color: colors.text, padding: 10, fontWeight: 'bold' }}>TODAY TASKS</Text>
                                :
                                <Drawer.Section title="NO TASKS" style={{ alignItems: 'center' }} />
                        }

                        <View style={{ flexDirection: 'row', alignItems: 'center', width: 200, backgroundColor: 'gray' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
                        </View>


                        {
                            loading ?
                                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: 'center', }}>
                                    <SkeletonPlaceholder>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                            <View style={{ marginLeft: 20 }}>
                                                <View style={{ width: 300, height: 30, borderRadius: 4 }} />
                                                <View style={{ marginTop: 6, width: 300, height: 30, borderRadius: 4 }} />
                                            </View>
                                        </View>
                                    </SkeletonPlaceholder>
                                </ScrollView>
                                :
                                <FlatList
                                    style={{ width: '100%' }}
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

                        }

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
