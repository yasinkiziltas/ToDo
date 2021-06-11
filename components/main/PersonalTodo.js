import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Card } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function PersonalTodo({ item, onDelete }) {
    const { colors } = useTheme()
    const { deleteBtn, deleteBtnIcon, title, details } = styles;

    return (
        <View>
            {
                item.todoType === 'Personal'
                    ?
                    <TouchableOpacity onPress={() => { alert('Buraya detay olarak modal gelcek') }}>
                        <View style={{ backgroundColor: colors.card }}>
                            <Card containerStyle={{ borderRadius: 10, elevation: 4 }}>
                                <Text style={title}>{item.title}</Text>
                                <Text style={details}>{item.todo}</Text>

                                <TouchableOpacity style={deleteBtn} onPress={() => onDelete(item.id)}>
                                    <MaterialCommunityIcons style={deleteBtnIcon} name="delete" size={25} />
                                </TouchableOpacity>
                            </Card>
                        </View>
                    </TouchableOpacity>
                    :
                    null
            }


        </View >
    )
}

const styles = StyleSheet.create({
    deleteBtn: {
        margin: 5,
        position: 'absolute',
        right: 0,
    },
    deleteBtnIcon: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2E9298'
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