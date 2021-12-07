import React, { Component } from 'react'
import { View, StyleSheet, Text, Pressable, FlatList, Image } from 'react-native'
import api from '../../src/services/api'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'
import Modal from 'react-native-modal'


export default class HomeWorker extends Component {



    constructor(props) {

        super(props)

        this.state = {

            listServicesWorker: [],
            Vehicle: [],
            visible: false

        }

    }


    ShowVehicle = async (id) => {

        try {

            const answer = await api.get('/Vehicles/VehicleId/' + id)

            const dataVehicle = answer.data

            this.setState({ Vehicle: dataVehicle })

            console.log(this.state.Vehicle)

            this.setState({ visible: true })

        }

        catch (error) {

            console.log(error)

        }

    }

    GetServicesWorker = async () => {

        try {

            const valueToken = await AsyncStorageLib.getItem('userToken')

            var IdWorker = jwtDecode(valueToken).jti

            const answer = await api.get('/Services/Worker/' + IdWorker)

            const dataServicesWorker = answer.data

            this.setState({ listServicesWorker: dataServicesWorker })

        }

        catch (error) {

            console.log(error)

        }

    }


    ViewImages = async (id) => {

        try {

            console.log(id)

            // await AsyncStorageLib.setItem('IdService', id)
            await localStorage.setItem('IdService', id)

            this.props.navigation.navigate("ViewImageAdm")

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

        this.GetServicesWorker()

    }



    render() {

        return (

            <View style={styles.container}>


                <Pressable
                    style={styles.exitButton}
                    onPress={this.Logout}
                >
                    <Image
                        source={require('../../assets/images/back.png')}
                        style={styles.arrow}
                    />

                    <Text style={styles.exitText}>Sair</Text>
                </Pressable>



                {/* LISTA */}

                <View style={styles.mainBody}>

                    <FlatList
                        contentContainerStyle={styles.mainBodyContent}
                        data={this.state.listServicesWorker}
                        keyExtractor={item => item.id}
                        renderItem={this.renderItem}
                    />

                </View>

                {/* FIM LISTA */}



            </View>

        )

    }



    renderItem = ({ item }) => (

        <View style={styles.flatItemRow}>

            <View style={styles.flatItemContainer}>

                <Text style={styles.flatItemInfo}>Data Solicitação: {Intl.DateTimeFormat('pt-BR').format(new Date(item.creationDate))}</Text>
                <Text style={styles.flatItemInfo}>Descrição: {item.serviceDescription}</Text>
                <Text style={styles.flatItemInfo}>Status Serviço: {item.serviceStatus}</Text>
                <Text style={styles.flatItemInfo}>Tipo Serviço: {item.serviceType.typeName}</Text>
                <Text style={styles.flatItemInfo}>Observações: {item.observations}</Text>

                <Pressable
                    style={styles.buttonList}
                    onPress={() => this.ShowVehicle(item.budget.idVehicle)}
                >
                    <Text style={styles.listTextButton}>Ver Veículo</Text>
                </Pressable>


                <Modal
                    isVisible={this.state.visible}
                    style={styles.modal}>

                    <View style={styles.modalView}>

                        <Text style={styles.modalTitle}><Text style={styles.modalTitleItem}>Modelo:</Text> {this.state.Vehicle.modelName}</Text>
                        <Text style={styles.modalText}><Text style={styles.modalItem}>Marca:</Text> {this.state.Vehicle.brandName}</Text>
                        <Text style={styles.modalText}><Text style={styles.modalItem}>Placa:</Text> {this.state.Vehicle.licensePlate}</Text>
                        <Text style={styles.modalText}><Text style={styles.modalItem}>Ano:</Text> {this.state.Vehicle.year}</Text>
                        <Text style={styles.modalText}><Text style={styles.modalItem}>Cor:</Text> {this.state.Vehicle.color}</Text>

                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => this.setState({ visible: false })}
                        >
                            <Text style={styles.textButtonClose}>Fechar</Text>
                        </Pressable>

                    </View>

                </Modal>


                {/* <Text style={styles.flatItemInfo}>Imagens do Serviço:
                    {item.serviceImages.map((img) => { img.imagePath })}
                </Text> */}

                <Pressable
                    style={styles.buttonList}
                    activeOpacity={0.5}
                    onPress={() => this.ViewImages(item.id)}
                >
                    <Text style={styles.listTextButton}>Ver Imagens</Text>
                </Pressable>


            </View>

        </View>

    )

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f2f3f9',
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

    subtitle: {
        fontFamily: 'Nunito700',
        fontSize: 18,
        fontWeight: "600",
        color: "#121212",
        textAlign: 'justify',
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: 12
    },

    subtitle1: {
        fontFamily: 'Nunito700',
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
        textAlign: 'left',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: 12
    },

    buttonList: {
        width: '70%',
        marginLeft: '15%',
        marginRight: '15%',
        height: 35,
        backgroundColor: '#282f66',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },

    listTextButton: {
        fontFamily: 'Nunito',
        fontSize: 18,
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



    //MODAL

    modal: {
        width: '80%',
        marginRight: '10%',
        marginLeft: '10%',
        // backgroundColor: 'lightgreen'
    },

    modalView: {
        width: '100%',
        height: '50%',
        borderWidth: 3,
        borderColor: '#282f66',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f1f1',
    },

    modalTitle: {
        fontFamily: 'Nunito700',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 10
    },

    modalItem: {
        fontFamily: 'Nunito',
        fontSize: 18,
        fontWeight: '600',
        color: '#282f66',
        marginTop: 10
    },

    modalTitleItem: {
        fontFamily: 'Nunito',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 10
    },

    modalText: {
        fontFamily: 'Nunito',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 15
    },

    buttonClose: {
        width: '50%',
        height: 35,
        backgroundColor: '#282f66',
        borderRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#f1f1f1',
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textButtonClose: {
        fontFamily: 'Nunito',
        fontSize: 20,
        fontWeight: "400",
        color: '#fff',
        marginBottom: '1%'
    },




    // LISTA

    mainBody: {
        flex: 4,
        // backgroundColor: 'lightblue'
    },

    // conteúdo da lista
    mainBodyContent: {
        paddingTop: 10,
        paddingRight: 70,
        paddingLeft: 70,
        marginTop: 5,
        marginBottom: 18,
        // backgroundColor: 'lightgreen'
    },

    // cada linha da lista
    flatItemRow: {
        width: 300,
        height: 350,
        paddingRight: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#282f66',
        marginTop: 18,
        // backgroundColor: 'lightpink'
    },

    flatItemContainer: {
        flex: 1,
        // backgroundColor: 'purple'
    },

    flatItemTitle: {
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: "600",
        color: '#282f66',
        marginTop: 10,
        // backgroundColor: 'lightyellow'
    },

    flatItemInfo: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: "500",
        color: '#000',
        lineHeight: 28,
        textAlign: 'justify',
        paddingTop: 5,
        // backgroundColor: 'lightgray'
    }


})