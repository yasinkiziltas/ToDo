import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import firebase from 'firebase'
import CustomHeader from '../CustomHeader'
import { useTheme } from '@react-navigation/native'
import DatePicker from 'react-native-datepicker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import RNPickerSelect from "react-native-picker-select";

export default function AddTodoScreen({ navigation }) {

    const [todo, setTodo] = useState(null);
    const [currentDate, setCurrentDate] = useState('');
    const [todoType, setTodoType] = useState(null)
    const [title, setTitle] = useState(null);
    const [date, setDate] = useState(null)
    const { colors } = useTheme()

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();

    const { InputField, addPostButton, addPostButtonText, } = styles;

    const submitTodo = async () => {
        var datet = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        setCurrentDate(datet + '/' + month + '/' + year);

        await firebase.firestore()
            .collection('todos')
            .doc(firebase.auth().currentUser.uid)
            .collection("userTodos")
            .add({
                userId: firebase.auth().currentUser.uid,
                title: title,
                todo: todo,
                date: date,
                todoType: todoType
            }).then(() => {
                console.log('Todo Added!')
                Alert.alert(
                    'Todo added!',
                    'Your todo has been published successfully!',
                )
                navigation.navigate('Home')
            })
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
            <CustomHeader title="Add Todo" navigation={navigation} isBack={true} />

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                    returnKeyType="next"
                    // borderBottomWidth: 1, borderColor: '#2E9298', 
                    style={[InputField, { margin: 20 }]}
                    placeholder="Enter todo title.."
                    placeholderTextColor="gray"
                    multiline
                    // format="DD-MM-YYYY"
                    // minDate="01-01-1900"
                    // maxDate="01-01-2050"
                    numberOfLines={2}
                    onChangeText={(content) => setTitle(content)}
                    value={title}
                    onSubmitEditing={() => ref_input2.current.focus()}
                />

                <TextInput
                    returnKeyType="next"
                    style={InputField}
                    placeholder="Enter new todo.."
                    //placeholderTextColor={colors.text}
                    placeholderTextColor="gray"
                    multiline
                    numberOfLines={2}
                    onChangeText={(content) => setTodo(content)}
                    value={todo}
                    // onSubmitEditing={() => ref_input3.current.focus()}
                    ref={ref_input2}
                />

                <DatePicker
                    style={InputField}
                    date={date}
                    placeholder="Select date.."
                    onDateChange={(date) => {
                        setDate(date);
                    }}
                    mode="date"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                />

                <View>
                    <RNPickerSelect
                        style={{ inputAndroid: { marginTop: 15, color: 'black' } }}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{ label: "Select your todo type: ", value: null }}
                        onValueChange={(value) => setTodoType(value)}
                        items={[
                            { label: "Personal", value: "Personal" },
                            { label: "Business", value: "Business" },
                        ]}
                    />
                </View>



                {/* <Text>{todoType ? todoType : ''}</Text> */}


                <TouchableOpacity style={addPostButton} onPress={submitTodo}>
                    <Text style={addPostButtonText}>New task  ^</Text>
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
