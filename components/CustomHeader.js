import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native'
import { useTheme } from '@react-navigation/native'

export default function CustomHeader({ title, navigation, isBack, isHome }) {

    const { container, contentHeader } = styles;
    const { colors } = useTheme()

    return (
        // <SafeAreaView style={[container, { backgroundColor: colors }]}>
        <SafeAreaView style={container}>
            <View style={contentHeader}>
                {
                    isBack
                        ?

                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../assets/img/back.png')} resizeMode="contain" style={{ width: 25, height: 25, marginLeft: 10, tintColor: colors.text }} />
                        </TouchableOpacity>

                        :

                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Image source={require('../assets/img/menu.png')} resizeMode="contain" style={{ width: 25, height: 25, marginLeft: 10, tintColor: colors.text }} />
                        </TouchableOpacity>
                }

            </View>


            <View style={contentHeader}>
                <Text style={{ textAlign: 'center', color: colors.text, fontWeight: 'bold', fontSize: Platform.OS === 'ios' ? 20 : null }}>{title}</Text>
            </View>


            <View style={contentHeader}>
                {
                    isHome ?
                        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                            <Image source={require('../assets/img/search.png')} resizeMode="contain" style={{ width: 25, height: 25, marginLeft: 90, tintColor: colors.text }} />
                        </TouchableOpacity>
                        :

                        null
                }

            </View>

            {/* <View style={contentHeader}>
                <TouchableOpacity>
                    <Image source={require('../assets/img/notify.png')} resizeMode="contain" style={{ width: 20, height: 20, marginLeft: 50 }} />
                </TouchableOpacity>
            </View> */}


        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flexDirection: 'row',
        height: 50,
    },
    contentHeader: {
        flex: 1,
        justifyContent: 'center',
    },
})
