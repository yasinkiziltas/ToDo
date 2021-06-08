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
import { Tabs, TabScreen } from 'react-native-paper-tabs';
import CustomHeader from '../CustomHeader'
import { SwipeListView } from 'react-native-swipe-list-view'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function HomeScreen({ navigation }) {
    const [todos, setTodos] = useState([])
    const [isModalVisible, setModalVisible] = useState(false);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const { colors } = useTheme()

    const VisibleItem = props => {
        const { data } = props;
        return (
            <View>
                {
                    data.item.todoType === 'Personal'
                        ?
                        <View style={styles.rowFront}>
                            <TouchableHighlight style={[styles.rowFrontVisible, { backgroundColor: colors.card }]}>
                                <View>
                                    <Text style={styles.title} numberOfLines={1}>
                                        {data.item.title}
                                    </Text>
                                    <Text style={styles.details} numberOfLines={1}>
                                        {data.item.todo}
                                    </Text>
                                </View>

                            </TouchableHighlight>
                        </View>
                        :
                        null
                }
            </View>


        )
    }

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...todos]
        const prevIndex = todos.findIndex(item => item.key === rowKey)
        newData.splice(prevIndex, 1);
        setTodos(newData)
    }

    const renderItem = (data, rowMap) => {
        return (
            <VisibleItem data={data} />
        )
    }

    const HiddenItemWithActions = props => {
        const {
            swipeAnimatedValue,
            leftActionActivated,
            rightActionActivated,
            rowActionAnimatedValue,
            rowHeightAnimatedValue,
            onClose,
            onDelete,
        } = props;

        if (rightActionActivated) {
            Animated.spring(rowActionAnimatedValue, {
                toValue: 500,
            }).start();
        }

        return (
            <Animated.View style={[styles.rowBack, { height: rowHeightAnimatedValue }]}>
                <Text>Left</Text>

                {/* <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={onClose}>
                    <Text>Close</Text>
                </TouchableOpacity> */}

                <Animated.View style={[styles.backRightBtn, styles.backRightBtnRight, {
                    flex: 1, width: rowActionAnimatedValue
                }]}>
                    <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={onDelete}>
                        <Animated.View style={[styles.trash, {
                            transform: [
                                {
                                    scale: swipeAnimatedValue.interpolate({
                                        inputRange: [-90, -45],
                                        outputRange: [1.7, 0],
                                        extrapolate: 'clamp'
                                    })
                                }
                            ]
                        }]}>
                            <MaterialCommunityIcons name="trash-can-outline" size={25} color="#fff" style={styles.trash} />
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>

            </Animated.View>
        )
    }

    const renderHiddenItem = (data, rowMap) => {
        const rowActionAnimatedValue = new Animated.Value(75);
        const rowHeightAnimatedValue = new Animated.Value(60);

        return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                rowActionAnimatedValue={rowActionAnimatedValue}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                onClose={() => closeRow(rowMap, data.item.key)}
                onDelete={() => deleteRow(rowMap, data.item.key)}
            />
        )
    }

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const onLeftActionStatusChange = rowKey => {
        console.log('onLeftActionStatusChange', rowKey);
    };

    const onRightActionStatusChange = rowKey => {
        console.log('onRightActionStatusChange', rowKey);
    };

    const onRightAction = rowKey => {
        console.log('onRightAction', rowKey);
    };

    const onLeftAction = rowKey => {
        console.log('onLeftAction', rowKey);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

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
        theme: theme
    }


    const { container, containerTitle, containerText, iconButton, iconText, row, rowText } = styles;

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



    const fetchTodos = () => {
        firebase.firestore()
            .collection("todos")
            .doc(firebase.auth().currentUser.uid)
            .collection("userTodos")
            .orderBy("todoTime", "asc")
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

    useEffect(() => {
        fetchTodos()
        fetchUser()
    }, [])


    return (

        <SafeAreaView style={container}>
            <StatusBar hidden />
            <CustomHeader title="" navigation={navigation} isHome={true} />

            <View style={containerTitle}>
                <Text style={[containerText, { color: colors.text }]}>What's up,  {userName}!</Text>
            </View>

            {/* {
                todos != null ?
                    <Drawer.Section title="MY TASKS" style={{ alignItems: 'center' }} />
                    :
                    <Drawer.Section title="NO TASKS" style={{ alignItems: 'center' }} />
            } */}
            <Drawer.Section title="MY TASKS" style={{ alignItems: 'center' }} />

            <SwipeListView
                data={todos}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-75}
                disableRightSwipe
                onRowDidOpen={onRowDidOpen}
                leftActivationValue={100}
                rightActivationValue={-200}
                leftActionValue={0}
                rightActionValue={-500}
                onLeftAction={onLeftAction}
                onRightAction={onRightAction}
                onLeftActionStatusChange={onLeftActionStatusChange}
                onRightActionStatusChange={onRightActionStatusChange}

            />

            {/* <Tabs {...tabsSettings} style={{ backgroundColor: '#2E9298' }}>
                <TabScreen label="Personal" icon="compass" >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 25 }}>
                        <Drawer.Section title="TODAY'S TASKS" style={{ alignItems: 'center' }}>

                            <SwipeListView
                                data={todos}
                                renderItem={renderItem}
                                renderHiddenItem={renderHiddenItem}
                                leftOpenValue={75}
                                rightActionValue={150}
                            />

                            <FlatList
                                style={{ width: '100%' }}
                                numColumns={1}
                                horizontal={false}
                                data={todos}
                                renderItem={({ item }) => (

                                    item.todoType == "Personal" ?
                                        <View style={row}>
                                            <Ionicons name="ellipse-outline" size={20} style={[{ paddingRight: 10, color: colors.text }]} />
                                            <Text style={[rowText, { color: colors.text }]}>{item.todo}</Text>
                                        </View>
                                        :
                                        null
                                )}
                            />

                        </Drawer.Section>
                    </View>
                </TabScreen>

                <TabScreen label="Business" icon="airplane">
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 25 }}>
                        <Drawer.Section title="TODAY'S TASKS" style={{ alignItems: 'center' }}>
                            <FlatList
                                style={{ width: '100%' }}
                                numColumns={1}
                                horizontal={false}
                                data={todos}
                                renderItem={({ item }) => (

                                    item.todoType == "Business" ?
                                        <View style={row}>
                                            <Ionicons name="ellipse-outline" size={20} style={[{ paddingRight: 10, color: colors.text }]} />
                                            <Text style={[rowText, { color: colors.text }]}>{item.todo}</Text>
                                        </View>
                                        :
                                        null
                                )}
                            />
                        </Drawer.Section>
                    </View>
                </TabScreen>
            </Tabs> */}

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
    row: {
        flex: 1,
        paddingVertical: 25,
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        alignSelf: 'flex-start',
    },
    rowText: {
        fontSize: 20
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        margin: 5,
        marginBottom: 15,
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    rowFrontVisible: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        padding: 10,
        marginBottom: 15,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 5,
        marginBottom: 15,
        borderRadius: 5,
    },
    backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        paddingRight: 17,
    },
    backRightBtnLeft: {
        backgroundColor: '#2E9298', //1f65ff
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    trash: {
        height: 25,
        width: 25,
        marginRight: 7,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#666',
    },
    details: {
        fontSize: 12,
        color: '#999',
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
