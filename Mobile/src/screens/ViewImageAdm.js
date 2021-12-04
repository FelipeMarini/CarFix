import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Modal } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from "../services/api"


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

            const IdService = localStorage.getItem('IdService')

            const answer = await api.get('/ServiceImages/Service/' + IdService)

            const dataImages = answer.data

            console.log(dataImages)

            this.setState({ listImages: dataImages })

            console.log(this.state.listImages)

        }

        catch (error) {

            console.log(error)

        }


    }


    ClearListImages = () => {

        this.setState({ listImages: [] })

    }


    Logout = async () => {

        try {

            await AsyncStorage.removeItem('userToken')

            this.props.navigation.navigate('Login')

        }

        catch (error) {

            console.log(error)

        }

    }


    DeleteImage = (id) => {

        try {

            console.log(id)

            const dataImages = this.state.listImages

            let filterArray = dataImages.filter((val, i) => {

                if (val.id !== id) {

                    return val

                }

            })

            console.log('filterArray', filterArray)

            const answer = api.delete('/ServiceImages/' + id)

            this.setState({ listImages: filterArray })

        }

        catch (error) {

            console.log(error)

        }

    }




    render() {

        return (


            <View style={styles.container}>


                <Text style={styles.title}>Imagens do Serviço</Text>


                <ScrollView>


                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.5}
                        onPress={this.GetImagesByService}
                    >
                        <Text style={styles.textButton}>Mostrar Imagens</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.5}
                        onPress={this.ClearListImages}
                    >
                        <Text style={styles.textButton}>Minimizar Lista</Text>
                    </TouchableOpacity>



                    {/* LISTA */}

                    <View style={styles.containerList}>

                        <FlatList
                            contentContainerStyle={styles.mainListContent}
                            data={this.state.listImages}
                            keyExtractor={item => item.id}
                            renderItem={this.renderItem}
                        />

                    </View>

                    {/* FIM LISTA */}



                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("ServiceVehicle")}
                        style={styles.exitButton}
                    >
                        <Image
                            source={require('../../assets/images/back.png')}
                            style={styles.exitImg}
                        />
                        <Text style={styles.exitTextButton}>Voltar</Text>
                    </TouchableOpacity>


                </ScrollView>


            </View>


        )

    }


    renderItem = ({ item }) => (

        <View style={styles.flatItemRow}>

            <View style={styles.flatItemContainer}>

                <Text style={styles.flatItemInfo}>{item.imagePath}</Text>

                <TouchableOpacity
                    style={styles.binButton}
                    onPress={() => this.DeleteImage(item.id)}
                >
                    <Image
                        source={require('../../assets/images/bin.png')}
                        style={styles.binImg}
                    />
                </TouchableOpacity>

            </View>

        </View>

    )


}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#f2f3f9",
        alignItems: 'center'
    },

    title: {
        marginTop: 20,
        fontFamily: 'nunito-700.ttf',
        fontSize: 32,
        fontStyle: "normal",
        fontWeight: "600",
        color: "#282F66"
    },

    button: {
        width: '80%',
        height: 35,
        borderRadius: 5,
        backgroundColor: '#282F66',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textButton: {
        fontFamily: 'roboto-regular.ttf',
        fontSize: 14,
        fontWeight: "600",
        color: '#fff'
    },

    exitButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '4%'
    },

    exitImg: {
        width: '10%',
        height: 15,
        marginTop: '0.8%'
    },

    exitTextButton: {
        fontFamily: 'nunito-regular.ttf',
        fontSize: 15,
        fontWeight: "600",
        color: '#000'
    },



    // LISTA

    containerList: {
        width: '80%',
        height: 'auto',
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        marginTop: 15,
        marginLeft: '10%',
        marginRight: '10%'
    },


    mainListContent: {

    },


    flatItemRow: {
        borderWidth: 1,
        borderColor: '#000',
        marginTop: 10
    },

    flatItemContainer: {
        flex: 1
    },


    flatItemInfo: {
        lineHeight: 20
    },

    binButton: {
        marginTop: 10
    },

    binImg: {
        width: 16,
        height: 16,
        tintColor: '#000',
    }


})