import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, ImageBackground, ActivityIndicator, Text, SafeAreaView, TextInput, Alert, KeyboardAvoidingView, Image, Platform } from 'react-native'
import CustomHeader from '../CustomHeader'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase'
import { useTheme } from '@react-navigation/native'

import BottomSheet from 'reanimated-bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'
import Animated from 'react-native-reanimated';


export default function EditProfileScreen({ navigation }) {
    const [name, setName] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [userData, setUserData] = useState(null)

    const user = firebase.auth().currentUser;

    const [image, setImage] = useState(null);
    const [profileImg, setProfileImg] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const { colors } = useTheme();

    const {
        container,
        commandButton,
        panel,
        header,
        panelHeader,
        panelTitle,
        panelSubtitle,
        panelButton,
        panelButtonTitle,
        action,
        panelHandle,
        actionError,
        textInput,
        forgotButton,
        forgotText,
    } = styles;

    let bs = React.createRef();
    let fall = new Animated.Value(1);

    const fetchUser = async () => {
        await firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    const name = snapshot.data().name;
                    const email = snapshot.data().email;
                    const img = snapshot.data().uploadImg;

                    setName(name);
                    setUserEmail(email);
                    setProfileImg(img);
                    setUserData(snapshot.data());
                }
                else (
                    console.log('Lütfen kayıt olduğunuz kullanıcı ile giriniz, firebase tarafında el ile eklediniğiniz değil!')
                )

            })
    }

    const handleUpdate = async () => {
        let user = firebase.auth().currentUser;
        const imageUrl = await uploadImage();
        console.log('Image Url: ', imageUrl);

        try {
            firebase.firestore()
                .collection('users')
                .doc(firebase.auth().currentUser.uid)
                .update({
                    name: userData.name,
                    email: userData.email,
                    uploadImg: imageUrl
                })
            user.updateEmail(userData.email)
                .then(() => {
                    user.updatePassword(password)
                })

            Alert.alert(
                'Profile Updated!',
                'Your profile has been updated successfully.'
            )
            console.log('user updated!', user)

        } catch (error) {
            console.log('Error: ', error)
        }
    }


    const takePhotoFromCamera = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA)

        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,

            }).then((image) => {
                console.log(image);
                const imageUri = image.uri;
                setImage(imageUri)
                bs.current.snapTo(1);
            })
        }

        else {
            Alert.alert("You need to give up permission to work!")
        }
    }

    const choosePhotoFromLibrary = async () => {
        const { granted } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)

        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,

            }).then((image) => {
                console.log(image);
                const imageUri = image.uri;
                setImage(imageUri)
                bs.current.snapTo(1);
            })

        }

        else {
            Alert.alert("You need to give up permission to work!")
        }
    }

    const uploadImage = async () => {
        if (image == null) {
            return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        setUploading(true)
        setTransferred(0)


        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                resolve(xhr.response);
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uploadUri, true);
            xhr.send(null);
        });



        const storageRef = firebase.storage().ref(`photos/${filename}`);
        const task = storageRef.put(blob);

        try {
            await task;
            const url = await storageRef.getDownloadURL();
            setUploading(false);
            setImage(null)
            return url;

        } catch (e) {
            console.log(e);
            return null;
        }
    }

    const renderInner = () => (
        <View style={panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={panelTitle}>Upload Photo</Text>
                <Text style={panelSubtitle}>Choose Your Profile Picture</Text>
            </View>
            <TouchableOpacity style={panelButton} onPress={takePhotoFromCamera}>
                <Text style={panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={panelButton} onPress={choosePhotoFromLibrary}>
                <Text style={panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={panelButton}
                onPress={() => bs.current.snapTo(1)}>
                <Text style={panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );

    const renderHeader = () => (
        <View style={header}>
            <View style={panelHeader}>
                <View style={panelHandle} />
            </View>
        </View>
    );

    useEffect(() => {
        fetchUser()
    }, [])


    return (
        <View style={container}>
            <CustomHeader title="Edit Profile" navigation={navigation} isBack={true} />

            <BottomSheet
                ref={bs}
                snapPoints={[330, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
            <Animated.View style={{
                margin: 20,
                opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
            }}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                        <View style={{ height: 100, width: 100, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                            {
                                image != null
                                    ?
                                    <ImageBackground source={{ uri: image }} style={{ height: 100, width: 100 }} imageStyle={{ borderRadius: 15 }}>
                                        {
                                            userData.uploadImg == null
                                                ?
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                                    <Icon name="camera" color="#fff" size={30} style={{
                                                        opacity: 0.7,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderWidth: 1,
                                                        borderColor: "#fff",
                                                        borderRadius: 35,
                                                    }} />
                                                </View>
                                                :
                                                null
                                        }
                                    </ImageBackground>

                                    :
                                    null
                            }

                            {
                                userData != null
                                    ?
                                    <ImageBackground source={{ uri: userData.uploadImg }} style={{ height: 100, width: 100 }} imageStyle={{ borderRadius: 15 }}>
                                        {
                                            userData.uploadImg == null
                                                ?
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                                    <Icon name="camera" color="#fff" size={30} style={{
                                                        opacity: 0.7,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        borderWidth: 1,
                                                        borderColor: "#fff",
                                                        borderRadius: 35,
                                                    }} />
                                                </View>
                                                :
                                                null
                                        }
                                    </ImageBackground>

                                    :

                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                        <Icon name="camera" color="#2E9298" size={30} style={{
                                            opacity: 0.7,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            borderColor: "#fff",
                                            borderRadius: 35
                                        }} />
                                    </View>

                            }
                        </View>

                    </TouchableOpacity>
                    {/* <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 18 }}>{name}</Text> */}
                </View>

                <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={5}>
                    <View style={action}>
                        <FontAwesome name="user-o" size={20} style={{ color: colors.text }} />
                        <TextInput
                            value={userData ? userData.name : ''}
                            onChangeText={(txt) => setUserData({ ...userData, name: txt })}
                            placeholder="Name..."
                            style={[textInput, { color: colors.text }]}
                            placeholderTextColor={colors.text}
                            autoCorrect={false}
                        />
                    </View>

                    <View style={action}>
                        <FontAwesome name="envelope-o" size={20} style={{ color: colors.text }} />
                        <TextInput
                            value={userData ? userData.email : ''}
                            onChangeText={(txt) => setUserData({ ...userData, email: txt })}
                            placeholder="Email.."
                            style={[textInput, { color: colors.text }]}
                            keyboardType="email-address"
                            placeholderTextColor={colors.text}
                            autoCorrect={false}
                        />
                    </View>

                    <TouchableOpacity onPress={() => handleUpdate()} style={commandButton}>
                        <Text style={panelButtonTitle}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={forgotButton} onPress={() => navigation.navigate('UpdatePassword')}>
                        <Text style={forgotText}>Change Password</Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 15 : null
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#2E9298',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },

    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        marginTop: 25,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        marginLeft: 15,
        flex: 1,
        // marginTop: Platform.OS === 'ios' ? 20 : -12,
        color: '#05375a',
        // textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
    forgotButton: {
        marginVertical: 35,
    },
    forgotText: {
        color: "#5882FD",
        fontSize: 15,
        textAlign: 'center'
    },
});