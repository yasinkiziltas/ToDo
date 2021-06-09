import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    TouchableHighlight,
} from 'react-native'
import firebase from 'firebase'
import { SwipeListView } from 'react-native-swipe-list-view'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '@react-navigation/native'


export default function PersonalTodo() {
    const [todos, setTodos] = useState([])
    const [test, setTest] = useState([])
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

    const fetchTodos = async () => {
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
                    setTest(data)
                    return {
                        id,
                        todo,
                        ...data
                    }

                })
                setTodos(todos)
                console.log(todos)
            })
    }

    useEffect(() => {
        fetchTodos()
    }, [])


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 25 }}>
            {
                todos.length > 0
                    ?
                    <Text style={{ color: colors.text }} >PERSONAL TASKS</Text>

                    :
                    <Text style={{ color: colors.text }}>NO TASKS</Text>
            }

            <View
                style={{
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgray',
                    width: 220,
                }}
            />

            <SwipeListView
                style={{ marginTop: 15 }}
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
