import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native'
import firebase from 'firebase'
import CustomHeader from '../CustomHeader'
import { useTheme } from '@react-navigation/native'
import DatePicker from 'react-native-datepicker';
import SearchableDropdown from 'react-native-searchable-dropdown';

export default function AddTodoScreen({ navigation }) {

    const [todo, setTodo] = useState(null);
    const [title, setTitle] = useState(null);
    const [date, setDate] = useState('21-10-2021')
    const [data, setData] = useState([])
    const [todoType, setTodoType] = useState(null)
    const { colors } = useTheme()

    const items = [
        { id: 1, name: 'Personal' },
        { id: 2, name: 'Business' }
    ];

    // const submitTodo = () => {
    //     firebase.firestore()
    //         .collection('todos')
    //         .add({
    //             userId: firebase.auth().currentUser.uid,
    //             title: title,
    //             todo: todo,
    //             todoTime: firebase.firestore.Timestamp.fromDate(new Date())
    //         }).then(() => {
    //             console.log('Todo Added!')
    //             Alert.alert(
    //                 'Todo added!',
    //                 'Your todo has been published successfully!',
    //             )
    //         })
    // }

    const submitTodo = () => {
        firebase.firestore()
            .collection('todos')
            .doc(firebase.auth().currentUser.uid)
            .collection("userTodos")
            .add({
                userId: firebase.auth().currentUser.uid,
                // title: title,
                todo: todo,
                date: date,
                todoTime: firebase.firestore.Timestamp.fromDate(new Date()),
                todoType: todoType
            }).then(() => {
                console.log('Todo Added!')
                Alert.alert(
                    'Todo added!',
                    'Your todo has been published successfully!',
                )
            })
    }

    useEffect(() => {
        setData(items)
        console.log(items)
    }, [])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
            <CustomHeader title="Add Todo" navigation={navigation} />

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                {/* <TextInput
                    style={styles.InputField}
                    placeholder="Title"
                    placeholderTextColor={colors.text}
                    multiline
                    numberOfLines={2}
                    onChangeText={(content) => setTitle(content)}
                    value={title}
                /> */}

                <TextInput
                    style={styles.InputField}
                    placeholder="Enter new task"
                    //placeholderTextColor={colors.text}
                    placeholderTextColor="gray"
                    multiline
                    numberOfLines={2}
                    onChangeText={(content) => setTodo(content)}
                    value={todo}
                />

                <DatePicker
                    style={styles.InputField}
                    date={date}
                    placeholder="Select date.."
                    onDateChange={(date) => {
                        setDate(date);
                    }}
                    mode="date"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                />

                <SearchableDropdown
                    // onTextChange={(text) => setTodoType(text)}
                    //On text change listner on the searchable input
                    onItemSelect={(item) => setTodoType(item)}
                    //onItemSelect called after the selection from the dropdown
                    containerStyle={{ padding: 5 }}
                    //suggestion container style
                    textInputStyle={{
                        //inserted text style
                        width: 150,
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        backgroundColor: '#FAF7F6',
                    }}
                    itemStyle={{
                        //single dropdown item style
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#FAF9F8',
                        borderColor: '#bbb',
                        borderWidth: 1,
                    }}
                    itemTextStyle={{
                        //text style of a single dropdown item
                        color: '#222',
                    }}
                    itemsContainerStyle={{
                        //items container style you can pass maxHeight
                        //to restrict the items dropdown hieght
                        maxHeight: '60%',
                    }}
                    items={items}
                    //mapping of item array
                    defaultIndex={2}
                    //default selected item index
                    placeholder="Select type todo"
                    //place holder for the search input
                    resetValue={false}
                    //reset textInput Value with true and false state
                    underlineColorAndroid="transparent"
                //To remove the underline from the android input
                />


                <TouchableOpacity style={styles.addPostButton} onPress={submitTodo}>
                    <Text style={[styles.addPostButtonText]}>New task  ^</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    InputField: {
        justifyContent: 'center',
        padding: 15,
        alignItems: 'center',
        fontSize: 24,
        textAlign: 'center',
        width: "90%",
    },

    // addPostButton: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     backgroundColor: '#2e64e515',
    //     borderRadius: 5,
    //     padding: 10
    // },

    addPostButton: {
        backgroundColor: '#2E9298',
        borderRadius: 30,
        padding: 15,

        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 10,
        shadowOpacity: 0.25,
        position: 'absolute',
        bottom: 35,
        right: 15,
    },

    addPostButtonText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white'
    }
});
