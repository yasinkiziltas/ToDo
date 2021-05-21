import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native'
import firebase from 'firebase'
import CustomHeader from '../CustomHeader'
import { useTheme } from '@react-navigation/native'

export default function AddTodoScreen({ navigation }) {

    const [todo, setTodo] = useState(null);
    const [title, setTitle] = useState(null);
    const { colors } = useTheme()

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
                title: title,
                todo: todo,
                todoTime: firebase.firestore.Timestamp.fromDate(new Date())
            }).then(() => {
                console.log('Todo Added!')
                Alert.alert(
                    'Todo added!',
                    'Your todo has been published successfully!',
                )
            })
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
            <CustomHeader title="" navigation={navigation} />

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <TextInput
                    style={styles.InputField}
                    placeholder="Title"
                    placeholderTextColor={colors.text}
                    multiline
                    numberOfLines={2}
                    onChangeText={(content) => setTitle(content)}
                    value={title}
                />

                <TextInput
                    style={styles.InputField}
                    placeholder="What's on your mind?"
                    placeholderTextColor={colors.text}
                    multiline
                    numberOfLines={2}
                    onChangeText={(content) => setTodo(content)}
                    value={todo}
                />

                <TouchableOpacity style={styles.addPostButton} onPress={submitTodo}>
                    <Text style={styles.addPostButtonTextn, { color: colors.text }}>Add Todo</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    InputField: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        textAlign: 'center',
        width: "90%",
    },

    addPostButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#2e64e515',
        borderRadius: 5,
        padding: 10
    },

    addPostButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e64e5'
    }
});
