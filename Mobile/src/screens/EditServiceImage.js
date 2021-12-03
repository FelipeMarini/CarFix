import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable, Image, ScrollView, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from "../services/api"



export default class EditServiceImage extends Component {

    // fazer update da imagem?
    // colocar mais informações na lista?
    // ! fazer com que o usuário possa visualizar a imagem

    constructor(props) {

        super(props)

        this.state = {

            idDeleteImage: '',
            listImages: [],
            paths: []

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

            await AsyncStorage.removeItem('userToken')

            this.props.navigation.navigate('Login')

        }

        catch (error) {

            console.log(error)

        }

    }


    DeleteImage = (id) => {

        try {

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


    componentDidMount = () => {

        this.GetImagesByService()

    }




    render() {

        return (


            <View style={styles.container}>


                <Text style={styles.title}>Imagens do Serviço</Text>


                <Pressable
                    style={styles.exitButton}
                    onPress={() => this.props.navigation.navigate('ServiceVehicle')}
                >
                    <Image
                        source={require('../../assets/images/back.png')}
                        style={styles.arrow}
                    />

                    <Text style={styles.exitText}>Voltar</Text>
                </Pressable>



                <ScrollView>

<<<<<<< HEAD
                <View>

                    {
                        this.state.listImages.map((image) => {
                            
                            return(
                                
                                <View style={styles.containerImg}> 
                                    
                                    <Image
                                    style={styles.img}
                                    source={{ uri: 'http://localhost:5000/Images/' + image.imagePath }} 
                                    />

                                    <Pressable
                                        style={styles.binButton}
                                        onPress={() => this.DeleteImage(image.id)}
                                        >
                                        <Image
                                            source={require('../../assets/images/bin.png')}
                                            style={styles.binImg}
                                        />
                                    </Pressable>
                                
                                </View>
                            
                            )
                        
                        })
                    }

                </View>
                   
=======

                    {/* LISTA */}

                    <View style={styles.mainBody}>

                        <FlatList
                            contentContainerStyle={styles.mainBodyContent}
                            data={this.state.paths}
                            keyExtractor={item => item.index}
                            renderItem={this.renderItem}
                        //extraData={this.state}  para atualizar lista?
                        />

                    </View>

                    {/* FIM LISTA */}
>>>>>>> 22d519096d274e8f78db6d378d8c9dfa0050ffa7


                </ScrollView>


            </View>


        )

    }


<<<<<<< HEAD
=======

    renderItem = ({ item }) => (


        <View style={styles.flatItemRow}>


            <View style={styles.flatItemContainer}>


                <Text>{item.imagePath}</Text>

                <Image
                    style={styles.img}
                    source={{ uri: 'http://localhost:5000/Images/' }}
                />

                <Pressable
                    style={styles.binButton}
                    onPress={() => this.DeleteImage(item.id)}
                >
                    <Image
                        source={require('../../assets/images/bin.png')}
                        style={styles.binImg}
                    />
                </Pressable>

            </View>


        </View>

    )


>>>>>>> 22d519096d274e8f78db6d378d8c9dfa0050ffa7
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#f2f3f9",
        alignItems: 'center'
    },

    title: {
        fontFamily: "nunito-700.ttf",
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
        fontFamily: 'nunito-regular.ttf',
        fontSize: 20,
        fontWeight: 400,
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
        fontFamily: 'nunito-700.ttf',
        fontSize: 20,
        color: '#000',
        marginTop: 16
    },



    // LISTA

    mainBody: {
        flex: 4,
        backgroundColor: 'lightblue'
    },

    mainBodyContent: {
        height: 'auto',
        paddingTop: 10,
        paddingRight: 70,
        paddingLeft: 70,
        marginTop: 5,
        marginBottom: 18,
        backgroundColor: 'lightgreen'
    },

    flatItemRow: {
        width: 300,
        height: 'auto',
        paddingRight: 20,
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: '#282f66',
        marginTop: 50,
        backgroundColor: 'lightpink'
    },

    flatItemContainer: {
        backgroundColor: 'purple'
    },

    binButton: {
        marginTop: 10
    },

    binImg: {
        width: 16,
        height: 16,
        tintColor: '#000',
    },

    img: {
<<<<<<< HEAD
        width: 150,
        height: 150,
        marginTop: 15
=======
        backgroundColor: 'lightgreen',
        width: 200,
        height: 200
>>>>>>> 22d519096d274e8f78db6d378d8c9dfa0050ffa7
    }


})