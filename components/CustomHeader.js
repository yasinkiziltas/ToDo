import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function CustomHeader({title, navigation}) {

    const {container, contentHeader, contentHeaderTitle, titleText, menuIcon} = styles;


    // const navigation = useNavigation();

    return (
        <SafeAreaView style={container}>
             <View style={contentHeader}>
                 <TouchableOpacity  onPress={() => navigation.openDrawer()} >
                    <Image source={require('../assets/img/menu.png')} resizeMode="contain" style={{width:25,height:25, marginLeft:10}} />
                 </TouchableOpacity>
                 
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
