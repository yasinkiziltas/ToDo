import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import Modal from 'react-native-modal';
import firebase from 'firebase'
import { useTheme } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import CustomHeader from '../CustomHeader'

export default function HomeScreen({ navigation }) {
    const [todos, setTodos] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const { colors } = useTheme()
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const {container, containerTitle, containerText, iconButton, iconText, todoContainer} = styles;

    const fetchUser = () => {
        firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    const name = snapshot.data().name;
                    const email = snapshot.data().email;

                    setUserName(name)
                    setUserEmail(email)
                    // console.log(snapshot.data())

                }
                else (
                    console.log('Lütfen kayıt olduğunuz kullanıcı ile giriniz, firebase tarafında el ile eklediniğiniz değil!')
                )

            })
    }

    const fetchTodos = () => {
        firebase.firestore()
          .collection("todos")
          .doc(firebase.auth().currentUser.uid)
          .collection("userTodos")
          .orderBy("todoTime", "asc")
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
              setTodos(todos)
              console.log('Todos ', todos)
          })
      }


    useEffect(() => {
        fetchUser()
        fetchTodos()
    }, [])


   
 

    return (
        <SafeAreaView style={container}>
            <CustomHeader title="" navigation={navigation} />

            <View style={containerTitle}>
                <Text style={[containerText, {color: colors.text}]}>What's up,  {userName}!</Text>
            </View>
            
            <View style={todoContainer}>           
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={todos}
                    renderItem={({ item }) => (
                        <Text>{item.todo}</Text>   

                    )}
                />
            </View>


            <TouchableOpacity style={iconButton} onPress={() => navigation.navigate('Add')}>
                    <Ionicons size={35} name="add" style={iconText}/>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    containerGallery: {
        flex: 1,
    },
    containerTitle:{
        marginLeft:20, 
        marginTop:10
    },
    containerText:{
        fontSize:28,
        fontWeight:'bold',
    },
    todoContainer:{
        flex:1, 
        justifyContent:'center', 
        alignItems:'center'
    },
    iconButton:{
        backgroundColor: '#2E9298',
        borderRadius: 40,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowRadius: 10,
        shadowOpacity: 0.25,
           position:'absolute',
           bottom:35,
           right:15,
    },
    iconText:{
        color:'white'
    }
})


/* <Modal isVisible={isModalVisible} style={styles.modalView}>
                <View style={{ flex: 1 }}>
                    <Button
                        style={{ flex: 1 }}
                        title="Hoşgeldiniz!"
                        onPress={toggleModal} />
                </View>
            </Modal> */


            // const styles = StyleSheet.create({
            //     modalView: {
            //         margin: 20,
            //         alignItems: "center",
            //         shadowColor: "#000",
            //         shadowOffset: {
            //             width: 0,
            //             height: 2
            //         },
            //         shadowOpacity: 0.25,
            //         shadowRadius: 4,
            //         elevation: 5
            //     }
            // })
