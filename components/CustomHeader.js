import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'

export default function CustomHeader({title, navigation}) {

    const {container, contentHeader} = styles;


    // const navigation = useNavigation();

    return (
        <SafeAreaView style={container}>
           
            <View style={contentHeader}>
                 <TouchableOpacity  onPress={() => navigation.openDrawer()} >
                    <Image source={require('../assets/img/menu.png')} resizeMode="contain" style={{width:25,height:25, marginLeft:10}} />
                 </TouchableOpacity>
             </View>
     
            
             <View style={contentHeader}>
                <Text style={{textAlign:'center'}}>{title}</Text>
             </View>


             <View style={contentHeader}>
                 <TouchableOpacity onPress={() => navigation.openDrawer()} >
                    <Image source={require('../assets/img/search.png')} resizeMode="contain" style={{width:25,height:25, marginLeft:90}} />
                 </TouchableOpacity>         
             </View>

             <View style={contentHeader}>
                 <TouchableOpacity onPress={() => navigation.openDrawer()} >
                    <Image source={require('../assets/img/notify.png')} resizeMode="contain" style={{width:20,height:20, marginLeft:50}} />
                 </TouchableOpacity>         
             </View>
 

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
})
