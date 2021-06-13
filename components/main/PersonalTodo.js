import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, Pressable } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Card } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal';
import FormInput from '../FormInput'
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from "react-native-picker-select";

export default function PersonalTodo({ item, onDelete }) {
  const { colors } = useTheme()
  const [isModalVisible, setModalVisible] = useState(false);
  const
    {
      InputField,
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
      textStyle,
      editBtn,
      editBtnIcon,
    } = styles;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const test = () => {
    alert('Test')
  }

  return (
    <View>
      {
        item.todoType === 'Personal'
          ?
          // onPress={toggleModal}
          <TouchableOpacity onPress={() => { }}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => {
                //  console.log('Detail has been closed.');
              }}>
              <View style={centeredView}>
                <View style={modalView}>
                  <Text style={modalTextTitle}>Todo Date</Text>
                  {/* <Text style={modalText}>{item.date}</Text> */}

                  <DatePicker
                    style={InputField}
                    // date={date}
                    placeholder="Select date.."
                    onDateChange={(date) => {
                      setDate(date);
                    }}
                    mode="date"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                  />

                  <View style={{ flexDirection: 'row', alignItems: 'center', width: 240 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
                  </View>

                  <Text style={[modalTextTitle, { paddingTop: 25 }]}>Todo Type</Text>
                  {/* <Text style={modalText}>{item.todoType}</Text> */}

                  <View style={{ marginLeft: 30, fontWeight: 'bold', alignItems: 'center', justifyContent: 'center', }}>
                    <RNPickerSelect

                      placeholder={{ label: "Select your todo type: ", value: null }}
                      onValueChange={(value) => setTodoType(value)}
                      items={[
                        { label: "Personal", value: "Personal" },
                        { label: "Business", value: "Business" },
                      ]}
                    />
                  </View>



                  <Pressable
                    style={[button, buttonClose]}
                    onPress={() => toggleModal()}
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

                <TouchableOpacity style={editBtn} onPress={toggleModal}>
                  <MaterialCommunityIcons style={editBtnIcon} name="pencil" size={30} />
                </TouchableOpacity>

                <TouchableOpacity style={deleteBtn} onPress={() => onDelete(item.id)}>
                  <MaterialCommunityIcons style={deleteBtnIcon} name="delete-circle" size={30} />
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
  InputField: {
    borderWidth: 0,
    justifyContent: 'center',
    padding: 15,
    alignItems: 'center',
    fontSize: 24,
    textAlign: 'center',
    width: "90%",
  },
  editBtn: {
    position: 'absolute',
    right: 30,
    margin: 5,
    paddingRight: 15
  },
  editBtnIcon: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4BB543'
  },
  deleteBtn: {
    margin: 5,
    position: 'absolute',
    right: 0,
  },
  deleteBtnIcon: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red'
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
    marginTop: 15,
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
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 15,
    textAlign: "center"
  }
})