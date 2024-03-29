import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import api from '../services/api'
import AsyncStorageLib from '@react-native-async-storage/async-storage'


export default class App extends Component {


    // fazer com que a câmera não ocupe a tela toda?

    state = {

        hasPermission: null,

        cameraType: Camera.Constants.Type.back,

        idService: ''

    }


    async componentDidMount() {

        this.getPermissionAsync()

        const IdService = AsyncStorageLib.getItem('IdService')
        // const IdService = localStorage.getItem('IdService')

        console.log(IdService)

    }


    getPermissionAsync = async () => {

        // Camera roll Permission 
        if (Platform.OS === 'ios') {

            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

            if (status !== 'granted') {

                ('Sorry, we need camera roll permissions to make this work!')

            }

        }

        // Camera Permission
        const { status } = await Permissions.askAsync(Permissions.CAMERA)

        this.setState({ hasPermission: status === 'granted' })

    }


    handleCameraType = () => {

        const { cameraType } = this.state

        this.setState({
            cameraType:
                cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
        })

    }


    dataURLtoFile = (dataurl, file) => {

        var arr =
            dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)

        while (n--) {

            u8arr[n] = bstr.charCodeAt(n);

        }

        return new File([u8arr], file, { type: mime })
    }


    takePicture = async () => {

        if (this.camera) {

            const IdService = AsyncStorageLib.getItem('IdService')
            // const IdService = localStorage.getItem('IdService')

            let photo = await this.camera.takePictureAsync()

            console.log(photo)

            var file = await this.dataURLtoFile(photo.uri, "image.png")

            console.log(file)

            const data = new FormData()
            data.append('IdService', IdService)
            data.append('FormFile', file)

            console.log(data)

            const answer = await api.post('/ServiceImages', data)

            alert('Imagem enviada com sucesso')

            this.props.navigation.navigate("ServiceVehicle")

        }

    }


    pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({

            mediaTypes: ImagePicker.MediaTypeOptions.Images

        })

    }


    launchCamera = () => {

        let options = {

            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }

        ImagePicker.launchCamera(options, (response) => {

            console.log('Response = ', response)

            if (response.didCancel) {

                console.log('User cancelled image picker')

            }

            else if (response.error) {

                console.log('ImagePicker Error: ', response.error)

            }

            else if (response.customButton) {

                console.log('User tapped custom button: ', response.customButton)
                alert(response.customButton)

            }

            else {

                const source = { uri: response.uri }

                console.log('response', JSON.stringify(response))

                this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri
                })
            }

        })

    }


    render() {

        const { hasPermission } = this.state

        if (hasPermission === null) {

            return <View />

        }

        else if (hasPermission === false) {

            return <Text>No access to camera</Text>

        }

        else {

            return (

                <View style={{ flex: 1 }}>

                    <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => { this.camera = ref }}>

                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: '10%' }}>

                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent'
                                }}
                                onPress={() => this.pickImage()}>

                                {/* <Ionicons
                                    name="ios-photos"
                                    style={{ color: "#fff", fontSize: 40 }}
                                /> */}


                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                }}
                                onPress={() => this.takePicture()}
                            >
                                <FontAwesome
                                    name="camera"
                                    style={{ color: "#fff", fontSize: 40 }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                }}
                                onPress={() => this.handleCameraType()}
                            >
                                <MaterialCommunityIcons
                                    name="camera-switch"
                                    style={{ color: "#fff", fontSize: 40 }}
                                />
                            </TouchableOpacity>

                        </View>

                    </Camera>

                </View>
            )

        }

    }

}