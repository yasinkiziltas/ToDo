import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import Modal from 'react-native-modal';
import firebase from 'firebase'
import { useTheme } from '@react-navigation/native'

import CustomHeader from '../CustomHeader'

export default function HomeScreen({ navigation }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const { colors } = useTheme()
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

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

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title="" navigation={navigation} />

            <View style={{ marginLeft: 20, marginTop: 10 }}>
                <Text style={{ fontWeight: '500', fontSize: 30, color: colors.text }}>What's up,  {userName}!</Text>
            </View>
        </SafeAreaView>
    )
}



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
