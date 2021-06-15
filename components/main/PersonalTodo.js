import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity, Pressable, TextInput } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Card } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal';
import firebase from 'firebase'
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from "react-native-picker-select";

export default function PersonalTodo({ item, onDelete }) {
  const [title, setTitle] = useState(null);
  const [todo, setTodo] = useState(null);
  const [date, setDate] = useState(null)
  const [userData, setUserData] = useState(null)
  const [todoType, setTodoType] = useState(null)

  const ref_input2 = useRef();
  const { colors } = useTheme()
  const [isModalVisible, setModalVisible] = useState(false);

  const
    {
      InputField,
      deleteBtn,
      deleteBtnIcon,
      contentTitle,
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
      hideButton,
    } = styles;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // const fetchTodos = async () => {
  //   const list = []

  //   await firebase.firestore()
  //     .collection("todos")
  //     .doc(firebase.auth().currentUser.uid)
  //     .collection("userTodos")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {

  //         const { date, title, todo, todoTime, todoType, userId } = doc.data();
  //         list.push({
  //           id: doc.id,
  //           date,
  //           title,
  //           todo,
  //           todoTime,
  //           todoType,
  //           userId
  //         })
  //       })
  //     })
  //   setUserData(list)
  //   console.log(list)
  // }

  const fetchTodos = async () => {
    await firebase.firestore()
      .collection("todos")
      .doc(firebase.auth().currentUser.uid)
      .collection("userTodos")
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const title = snapshot.data().title;
          const todo = snapshot.data().todo;
          const date = snapshot.data().date;
          const todoType = snapshot.data().todoType;

          setTitle(title)
          setTodo(todo);
          setDate(date)
          setTodoType(todoType)
          setUserData(snapshot.data());
          console.log(snapshot.data())
        }
      }).catch((e) => console.log('Error updating todo.', e));
  }


  const handleUpdate = (todoId) => {
    Alert.alert(
      'Update todo',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => updateTodo(todoId),
        },
      ],
      { cancelable: false },
    );
  };

  const updateTodo = async (todoId) => {
    console.log('Current todo Id: ', todoId);

    await firebase.firestore()
      .collection("todos")
      .doc(firebase.auth().currentUser.uid)
      .collection("userTodos")
      .doc(todoId)
      .update({
        title: userData.title,
        todo: userData.todo,
        todoType: userData.todoType,
        date: userData.date,
      })
      .then(() => {
        Alert.alert(
          'Todo updated!',
          'Your todo has been updated successfully!',
        );
        // setDeleted(true)
      })
      .catch((e) => console.log('Error updating todo.', e));
  };


  useEffect(() => {
    fetchTodos()
  }, [])

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

                  <Text style={modalTextTitle}>Todo Title</Text>
                  <TextInput
                    value={userData ? userData.title : ''}
                    style={{ marginBottom: 5 }}
                    returnKeyType="next"
                    placeholder="Enter todo title.."
                    placeholderTextColor="gray"
                    numberOfLines={2}
                    onChangeText={(content) => setUserData({ ...userData, title: content })}
                    onSubmitEditing={() => ref_input2.current.focus()}
                  />

                  <View style={{ flexDirection: 'row', alignItems: 'center', width: 240, paddingBottom: 25 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'gray', }} />
                  </View>

                  <Text style={modalTextTitle}>Todo Detail</Text>
                  <TextInput
                    style={{ marginBottom: 5 }}
                    returnKeyType="next"
                    placeholder="Enter new todo.."
                    placeholderTextColor="gray"
                    multiline
                    numberOfLines={2}
                    onChangeText={(content) => setUserData({ ...userData, todo: content })}
                    ref={ref_input2}
                  />


                  <View style={{ flexDirection: 'row', alignItems: 'center', width: 240, paddingBottom: 25 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'gray', }} />
                  </View>

                  <Text style={modalTextTitle}>Todo Date</Text>

                  <DatePicker
                    style={InputField}
                    date={userData ? userData.date : ''}
                    placeholder="Select date.."
                    onDateChange={(value) => {
                      setUserData({ ...userData, date: value })
                    }}
                    mode="date"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                  />

                  <View style={{ flexDirection: 'row', alignItems: 'center', width: 240 }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
                  </View>

                  <Text style={[modalTextTitle, { paddingTop: 25 }]}>Todo Type</Text>

                  <RNPickerSelect
                    style={{ inputAndroid: { marginTop: 15, color: 'black' } }}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{ label: "Select your todo type: ", value: null }}
                    onValueChange={(value) => setUserData({ ...userData, todoType: value })}
                    items={[
                      { label: "Personal", value: "Personal" },
                      { label: "Business", value: "Business" },
                    ]}
                  />

                  <Pressable
                    style={[button, buttonClose]}
                    onPress={() => handleUpdate(item.id)} //toggleModal()
                  >
                    <Text style={textStyle}>Update Todo</Text>

                  </Pressable>


                  <Pressable
                    style={[button, buttonClose]}
                    onPress={() => toggleModal()} //()
                  >
                    <Text style={textStyle}>Hide Todo</Text>

                  </Pressable>
                </View>
              </View>

            </Modal>

            <View style={{ backgroundColor: colors.card }}>
              <Card containerStyle={{ borderRadius: 10, elevation: 4 }}>
                <Text style={contentTitle}>{item.title}</Text>
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
  contentTitle: {
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