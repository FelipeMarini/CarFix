import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable, Image, ScrollView, FlatList } from 'react-native'
import api from "../services/api"
import AsyncStorageLib from '@react-native-async-storage/async-storage'



export default class ViewImageAdm extends Component {



    constructor(props) {

        super(props)

        this.state = {

            listImages: []

        }

    }



    GetImagesByService = async () => {


        try {

            // const IdService = AsyncStorageLib.getItem('IdService')
            const IdService = localStorage.getItem('IdService')

            const answer = await api.get('/ServiceImages/Service/' + IdService)

            const dataImages = answer.data

            this.setState({ listImages: dataImages })

            var images = this.state.listImages.map(function (item) {

                return { key: item.imagePath }

            })

            this.setState({ paths: images })

        }

        catch (error) {

            console.log(error)

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
                                            source={{ uri: 'https://localhost:5001/Images/' + image.imagePath }}
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
        marginTop: 18,
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
        marginTop: 15
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



    // LISTA

    mainBody: {
        flex: 4,
        // backgroundColor: 'lightblue'
    },

    mainBodyContent: {
        height: 'auto',
        paddingTop: 10,
        paddingRight: 70,
        paddingLeft: 70,
        marginTop: 5,
        marginBottom: 18,
        // backgroundColor: 'lightgreen'
    },

    flatItemRow: {
        width: 300,
        height: 'auto',
        paddingRight: 20,
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: '#282f66',
        marginTop: 50,
        // backgroundColor: 'lightpink'
    },

    flatItemContainer: {
        // backgroundColor: 'purple'
    },

    img: {
        width: 150,
        height: 150,
        marginTop: 15
    }


})