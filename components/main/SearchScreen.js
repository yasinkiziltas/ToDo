import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import firebase from 'firebase'
import CustomHeader from '../CustomHeader'

export default function SearchScreen({ navigation }) {
    const [searchTodos, setSearchTodos] = useState([])

    const { container, containerTitle, containerText, iconButton, iconText, row, rowText } = styles;

    const fetchSearchTodos = (search) => {
        firebase.firestore()
            .collection("todos")
            .doc(firebase.auth().currentUser.uid)
            .collection("userTodos")
            .where('todo', '>=', search)
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
                setSearchTodos(todos)
                console.log(todos)
            })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <CustomHeader title="" navigation={navigation} isBack={true} />

            <TextInput
                onChangeText={(search) => fetchSearchTodos(search)}
                returnKeyType="next"
                style={[styles.InputField, { borderBottomWidth: 1, borderColor: '#2E9298', marginBottom: 25, }]}
                placeholder="Search todo.."
                placeholderTextColor="gray"
                multiline
                numberOfLines={2}
            />

            {/* <TextInput placeholder="Search todo.." onChangeText={(search) => fetchSearchTodos(search)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} /> */}

            <FlatList

                numColumns={1}
                data={searchTodos}
                horizontal={false}
                renderItem={({ item }) => (
                    <Text style={row}>{item.todo}</Text>

                    // <TouchableOpacity onPress={() => props.navigation.navigate('Profile', { uid: item.id })}>
                    //     <Text>{item.todo}</Text>
                    // </TouchableOpacity>
                )}
            />
        </View>
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
    row: {
        flex: 1,
        borderWidth: 1,
        margin: 10,
        paddingVertical: 5,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        alignSelf: 'flex-start',
    },
})