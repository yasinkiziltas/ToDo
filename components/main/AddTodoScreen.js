import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import firebase from 'firebase'

export default function AddTodoScreen() {
    const [todo, setTodo] = useState(null);
    const [title, setTitle] = useState(null);

    const submitTodo = () => {
        firebase.firestore()
            .collection('todos')
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <TextInput
                style={styles.InputField}
                placeholder="Title"
                multiline
                numberOfLines={2}
                onChangeText={(content) => setTitle(content)}
                value={title}
            />

            <TextInput
                style={styles.InputField}
                placeholder="What's on your mind?"
                multiline
                numberOfLines={2}
                onChangeText={(content) => setTodo(content)}
                value={todo}
            />

            <TouchableOpacity style={styles.addPostButton} onPress={submitTodo}>
                <Text style={styles.addPostButtonTextn}>Add Todo</Text>
            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    InputField: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        textAlign: 'center',
        width: "90%"
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
