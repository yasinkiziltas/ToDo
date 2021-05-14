import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

export default function AddTodoScreen() {
    const [post, setPost] = useState(null);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                style={styles.InputField}
                placeholder="What's on your mind?"
                multiline
                numberOfLines={2}
                onChangeText={(content) => setPost(content)}
                value={post}
            />
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
});
