import React, { useState } from 'react'
import { SafeAreaView, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

import CustomHeader from '../CustomHeader'

export default function HomeScreen() {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const navigation = useNavigation()

    return (
        <SafeAreaView style={{flex:1}}>
            <CustomHeader title="Home"/>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Button title="Open drawer" onPress={() => navigation.openDrawer()} />   
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
            