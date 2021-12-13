import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Modal, Image } from 'react-native'
import { Camera } from 'expo-camera'
import { FontAwesome } from '@expo/vector-icons'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import api from '../services/api'
import { useNavigation } from '@react-navigation/native'



export default function App() {


    // fazer loader quando captura a imagem

    // aprender a usar o navigation com o hooks


    const camRef = useRef(null)

    const [type, setType] = useState(Camera.Constants.Type.front)

    const [hasPermission, setHasPermission] = useState(null)

    const [capturedPhoto, setCapturedPhoto] = useState(null)

    const [open, setOpen] = useState(false)

    const [photo, setPhoto] = useState(null)



    useEffect(() => {

        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === "granted")
        })()


    }, [])


    if (hasPermission === null) {
        return <View />
    }


    if (hasPermission === false) {
        return <Text>Access Denied to Camera</Text>
    }


    const createFormData = async (photo) => {

        const data = new FormData();
        const uriParts = photo.uri.split('.');
        const fileType = uriParts[uriParts.length - 1];

        data.append('FormFile', {
            name: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '.jpg',
            type: `image/${fileType}`,
            uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });

        const IdService = await AsyncStorageLib.getItem('IdService')
        // const IdService = localStorage.getItem('IdService')  (é síncrono o local storage)
        console.log(IdService)

        data.append('IdService', IdService)

        return data;
    };


    async function TakePicture() {

        if (camRef) {

            const photoAux = await camRef.current.takePictureAsync()

            setPhoto(photoAux)

            console.log(photo)

            const data = await createFormData(photoAux)

            try {

                await api.post('/ServiceImages', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                alert("Foto registrada com sucesso")

                setOpen(true)

            }

            catch (error) {

                console.log(error.response)

            }

        }

    }



    return (


        <SafeAreaView style={styles.container}>


            <Camera
                style={styles.camera}
                type={type}
                ref={camRef}
            >

                <View style={styles.contentButtons}>

                    <TouchableOpacity
                        style={styles.buttonFlip}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            )
                        }}
                    >

                        <FontAwesome name="exchange" size={23} color="red"></FontAwesome>

                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.buttonCamera}
                        onPress={TakePicture}
                    >

                        <FontAwesome name="camera" size={23} color="white"></FontAwesome>

                    </TouchableOpacity>


                </View>

            </Camera>


            {photo && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={open}
                >

                    <View style={styles.contentModal}>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => { setOpen(false) }}
                        >

                            <FontAwesome name="close" size={50} color="white"></FontAwesome>

                        </TouchableOpacity>

                        <Image
                            style={styles.imgPhoto}
                            source={{ uri: photo.uri }}
                        />

                    </View>

                </Modal>
            )}


        </SafeAreaView>

    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
    },

    camera: {
        width: '100%',
        height: '100%'
    },

    contentButtons: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },

    buttonFlip: {
        position: "absolute",
        bottom: 50,
        left: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        width: 50,
        borderRadius: 50
    },

    buttonCamera: {
        position: "absolute",
        bottom: 50,
        right: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        margin: 20,
        height: 50,
        width: 50,
        borderRadius: 50
    },

    contentModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        margin: 20
    },

    closeButton: {
        position: "absolute",
        top: 10,
        left: 2,
        margin: 10
    },

    imgPhoto: {
        width: '100%',
        height: 400
    }


})