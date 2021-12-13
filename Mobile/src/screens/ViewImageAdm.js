import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable, Image, ScrollView } from 'react-native'
import api from "../services/api"
import AsyncStorageLib from '@react-native-async-storage/async-storage'



export default class ViewImageAdm extends Component {


    // fazer update da imagem?
    // colocar mais informações na lista?
    // ! fazer com que o usuário possa visualizar a imagem


    constructor(props) {

        super(props)

        this.state = {

            idDeleteImage: '',
            listImages: []
        }

    }



    GetImagesByService = async () => {

        try {

            // const é considerado como "object" na requisição sem toString()

            const IdService = (await AsyncStorageLib.getItem('IdService')).toString()
            // const IdService = localStorage.getItem('IdService')

            console.log(IdService)

            const answer = await api.get('/ServiceImages/Service/' + IdService)

            const dataImages = answer.data

            console.log(dataImages)

            this.setState({ listImages: dataImages })

            console.log(this.state.listImages)

            var images = this.state.listImages.map(function (item) {

                return { key: item.imagePath }

            })

        }

        catch (error) {

            console.log(error.response)

        }


    }


    Logout = async () => {

        try {

            await AsyncStorageLib.removeItem('userToken')

            this.props.navigation.navigate('Login')

        }

        catch (error) {

            console.log(error)

        }

    }



    componentDidMount = () => {

        this.GetImagesByService()

    }



    render() {

        return (


            <View style={styles.container}>


                <Text style={styles.title}>Imagens do Serviço</Text>


                <Pressable
                    style={styles.exitButton}
                    onPress={() => this.props.navigation.navigate('HomeWorker')}
                >
                    <Image
                        source={require('../../assets/images/back.png')}
                        style={styles.arrow}
                    />

                    <Text style={styles.exitText}>Voltar</Text>
                </Pressable>



                <ScrollView>

                    <View>

                        {
                            this.state.listImages.map((image) => {

                                return (

                                    <View
                                        style={styles.containerImg}
                                        key={image.id}
                                    >

                                        <Image
                                            style={styles.img}
                                            source={{ uri: 'https://54.147.100.207/Images/' + image.imagePath }}
                                        />

                                    </View>

                                )

                            })
                        }

                    </View>



                </ScrollView>


            </View>


        )

    }


}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#f2f3f9",
        alignItems: 'center'
    },

    title: {
        fontFamily: 'Nunito700',
        color: "rgba(40,47,102,1)",
        fontSize: 34,
        marginTop: 60,
        marginLeft: '5%',
        marginRight: '5%',
        textAlign: 'center'
    },

    button: {
        width: '60%',
        height: 40,
        backgroundColor: '#282f66',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#f1f1f1',
        marginTop: 25
    },

    textButton: {
        fontFamily: 'Nunito',
        fontSize: 20,
        fontWeight: "400",
        color: '#fff',
        marginBottom: '1%'
    },


    exitButton: {
        width: '50%',
        height: 50,
        flexDirection: 'row',
        marginLeft: '20%',
        marginTop: 25
    },

    arrow: {
        width: '22%',
        height: 65
    },

    exitText: {
        fontFamily: 'Nunito700',
        fontSize: 20,
        color: '#000',
        marginTop: 16
    },

    containerImg: {
        marginTop: 30
    },

    img: {
        width: 250,
        height: 250,
        marginTop: 15
    }


})