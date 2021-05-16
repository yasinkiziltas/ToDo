import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CustomHeader({title}) {

    const {container, contentHeader, contentHeaderTitle, titleText, menuIcon} = styles;

    return (
        <SafeAreaView style={container}>
             <View style={contentHeader}>
                 <MaterialCommunityIcons style={menuIcon} name="menu" size={30} />
             </View>

             <View style={contentHeaderTitle}>
                <Text>{title}</Text>
             </View>

             <View style={contentHeader}></View>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        paddingTop:20,
        flexDirection:'row',
        height:50,
    },
    contentHeader:{
        flex:1,
        justifyContent: 'center',
    },
    contentHeaderTitle:{
        paddingTop:20,
        textAlign:'center',
        alignItems:'center',
    },
    menuIcon:{
        marginLeft: 15 
    }
})
