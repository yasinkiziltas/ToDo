import React, {useState} from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, Pressable} from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Card } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal';

export default function BusinessTodo({ item, onDelete }) {
    const { colors } = useTheme()
    const [isModalVisible, setModalVisible] = useState(false);
    const 
    { 
        deleteBtn, 
        deleteBtnIcon, 
        title, 
        details, 
        centeredView, 
        modalView, 
        modalText, 
        modalTextTitle,
        button,
        buttonClose,
        textStyle
    } = styles;

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };

    return (
        <View>
            {
                item.todoType === 'Business'
                ?
                <TouchableOpacity onPress={toggleModal}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                     visible={isModalVisible}
                     onRequestClose={() => {
                     console.log('Modal has been closed.');
          }}>
                <View style={centeredView}>
                    <View style={modalView}>
                         <Text style={modalTextTitle}>Todo Date</Text>
                         <Text style={modalText}>{item.date}</Text>

                         <View style={{ flexDirection: 'row', alignItems: 'center', width: 90 }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
                        </View>

                         <Text style={[modalTextTitle, {paddingTop:15}]}>Todo Type</Text>
                         <Text style={modalText}>{item.todoType}</Text>

                    <Pressable
                      style={[button, buttonClose]}
                     onPress={() => setModalVisible(!isModalVisible)}
                    >
                        <Text style={textStyle}>Hide Todo</Text>

                     </Pressable>
                    </View>
                </View>

                </Modal>

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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2E9298",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {  
        marginBottom: 15,
        textAlign: "center"
      },
      modalTextTitle: {
        fontWeight:'bold',
        color:'gray',
        marginBottom: 15,
        textAlign: "center"
      }
})