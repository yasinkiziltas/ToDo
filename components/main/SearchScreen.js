import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native'
import firebase from 'firebase'
import CustomHeader from '../CustomHeader'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTheme } from '@react-navigation/native'

export default function SearchScreen({ navigation }) {
    const [searchTodos, setSearchTodos] = useState([])
    const { colors } = useTheme()
    const { row, rowText } = styles;

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
        <View style={{ flex: 1 }}>
            <CustomHeader title="" navigation={navigation} isBack={true} />

            <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} behavior="padding" keyboardVerticalOffset={50} >
                <TextInput
                    onChangeText={(search) => fetchSearchTodos(search)}
                    returnKeyType="next"
                    style={styles.InputField}
                    placeholder="Search todo.."
                    placeholderTextColor="gray"
                    multiline
                    numberOfLines={2}
                />

                <FlatList
                    numColumns={1}
                    data={searchTodos}
                    horizontal={false}
                    renderItem={({ item }) => (
                        <View style={row}>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { }}>
                                <Ionicons name="ellipse-outline" size={20} style={[{ flexDirection: 'row', paddingRight: 10, color: colors.text }]} />
                                <Text style={[rowText, { color: colors.text }]}>{item.todo}</Text>
                            </TouchableOpacity>

                        </View>
                    )}
                />
            </KeyboardAvoidingView>

        </View>
    )
}


const styles = StyleSheet.create({
    InputField: {
        flex: 1,
        justifyContent: 'center',
        padding: 15,
        alignItems: 'center',
        fontSize: 24,
        textAlign: 'center',
        width: "90%",
    },
    row: {
        flex: 1,
        margin: 10,
        paddingVertical: 5,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        alignSelf: 'flex-start',
    },
    rowText: {
        fontSize: 20
    }
})