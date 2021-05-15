import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, SafeAreaView, Image, Text, Button } from 'react-native'
import firebase from 'firebase'


const signOut = () => {
    try {
        firebase.auth().signOut();
        console.log('Logout success')
    } catch (error) {
        console.log(error)
    }
}

export default function ProfileScreen() {
    const [userName, setUserName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    const { container, userImg, userNameStyl } = styles;

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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

            <ScrollView
                style={container}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }}
                showsVerticalScrollIndicator={false}
            >
                <Image style={userImg} source={require('../../assets/img/user-8.jpg')} />
                <Text style={userNameStyl}>{userName}</Text>
                <Text style={userNameStyl}>{userEmail}</Text>
            </ScrollView>
            <Button title="Logout" onPress={() => signOut()} />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    userNameStyl: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },

});