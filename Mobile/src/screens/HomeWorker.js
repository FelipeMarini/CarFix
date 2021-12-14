import React, { Component } from 'react'
import { View, StyleSheet, Text, Pressable, FlatList, Image } from 'react-native'
import api from '../../src/services/api'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'
import Modal from 'react-native-modal'
import { Picker } from '@react-native-picker/picker'


export default class HomeWorker extends Component {


    // desabilitar botão de alterar status se o picker não for alterado?


    constructor(props) {

        super(props)

        this.state = {

            IdService: '',
            listServicesWorker: [],
            Vehicle: [],

            listStatus: ['Finalizado', 'Em Andamento', 'Pendente'],
            status: '',

            visibleVehicle: false,
            visibleStatus: false

        }

    }


    UpdateList = async () => {

        try {

            const valueToken = await AsyncStorageLib.getItem('userToken')

            var IdWorker = jwtDecode(valueToken).jti

            const answer = await api.get('/Services/Worker/' + IdWorker)

            const dataServicesWorker = answer.data

            this.setState({ listServicesWorker: dataServicesWorker })

            if (answer.status == 200) {

                alert('Lista de serviços atualizada')

            }

        }

        catch (error) {

            console.log(error)

        }

    }


    ShowVehicle = async (id) => {

        try {

            const answer = await api.get('/Vehicles/VehicleId/' + id)

            const dataVehicle = answer.data

            this.setState({ Vehicle: dataVehicle })

            console.log(this.state.Vehicle)

            this.setState({ visibleVehicle: true })

        }

        catch (error) {

            console.log(error)

        }

    }


    ShowStatus = async (id, initialStatus) => {

        try {

            await this.setState({ IdService: id })

            await this.setState({ status: initialStatus })

            console.log(this.state.IdService)

            console.log(this.state.status)

            await this.setState({ visibleStatus: true })

        }

        catch (error) {

            console.log(error)

        }

    }


    AlterStatus = async () => {

        try {

            console.log(this.state.status)

            var Status = ''
            if (this.state.status == 0) { Status = 'Finalizado' }
            if (this.state.status == 1) { Status = 'Em Andamento' }
            if (this.state.status == 2) { Status = 'Pendente' }


            if (this.state.status !== 'Finalizado' &&
                this.state.status !== 'Em Andamento' &&
                this.state.status !== 'Pendente') {

                alert('Status do Serviço mantido para ' + Status)

                this.setState({ visibleStatus: false })

            }

            if (this.state.status == 'Finalizado') {

                const answer = api.patch('/Services/ServiceStatus', {

                    idService: this.state.IdService,
                    serviceStatus: 0

                })

                alert('Status do Serviço alterado para Finalizado ')

                this.setState({ visibleStatus: false })

            }

            if (this.state.status == 'Em Andamento') {

                const answer = api.patch('/Services/ServiceStatus', {

                    idService: this.state.IdService,
                    serviceStatus: 1

                })

                alert('Status do Serviço alterado para Em Andamento')

                this.setState({ visibleStatus: false })

            }

            if (this.state.status == 'Pendente') {

                const answer = api.patch('/Services/ServiceStatus', {

                    idService: this.state.IdService,
                    serviceStatus: 2

                })

                alert('Status do Serviço alterado para Pendente')

                this.setState({ visibleStatus: false })

            }

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

            await AsyncStorageLib.setItem('IdService', id)
            // await localStorage.setItem('IdService', id)

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


                <Text style={styles.title}>Meus Serviços</Text>


                <Pressable
                    style={styles.button}
                    onPress={() => this.UpdateList()}
                >
                    <Text style={styles.textButton}>Atualizar Serviços</Text>
                </Pressable>


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
                        extraData={this.state.listServicesWorker}
                        keyExtractor={item => item.id}
                        renderItem={this.renderItem}
                    />

                </View>

                {/* FIM LISTA */}



            </View>

        )

    }



    renderItem = ({ item }) => (


        <View style={styles.container}>

            <View style={styles.flatItemRow}>

                <View style={styles.flatItemContainer}>

                    <Text style={styles.flatItemInfo}>Descrição: {item.serviceDescription}</Text>

                    <View style={styles.containerStatus}>

                        {item.serviceStatus == 0
                            ?
                            <Text style={styles.flatItemStatus}>Status: Finalizado</Text>
                            :
                            <Text></Text>
                        }

                        {item.serviceStatus == 1
                            ?
                            <Text style={styles.flatItemStatus}>Status: Em Andamento</Text>
                            :
                            <Text></Text>
                        }

                        {item.serviceStatus == 2
                            ?
                            <Text style={styles.flatItemStatus}>Status: Pendente</Text>
                            :
                            <Text style={styles.flatItemInfo}></Text>
                        }

                    </View>


                    <Text style={styles.flatItemInfo}>Tipo Serviço: {item.serviceType.typeName}</Text>
                    <Text style={styles.flatItemInfo}>Observações: {item.observations}</Text>

                    <Pressable
                        style={styles.buttonList}
                        onPress={() => this.ShowStatus(item.id, item.serviceStatus)}
                    >
                        <Text style={styles.listTextButton}>Alterar Status</Text>
                    </Pressable>

                    <Modal
                        isVisible={this.state.visibleStatus}
                        style={styles.modal}>

                        <View style={styles.modalView}>

                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.status}
                                onValueChange={(itemValue) => this.setState({ status: itemValue })}>
                                {
                                    this.state.listStatus.map((item, index) => {

                                        return <Picker.Item value={item} label={item} key={index} />

                                    })
                                }
                            </Picker>

                            <Pressable
                                style={styles.buttonStatus}
                                onPress={this.AlterStatus}
                            >
                                <Text style={styles.textButtonStatus}>Alterar Status</Text>
                            </Pressable>

                            <Pressable
                                style={styles.buttonClose1}
                                onPress={() => this.setState({ visibleStatus: false })}
                            >
                                <Text style={styles.textButtonClose1}>Fechar</Text>
                            </Pressable>


                        </View>

                    </Modal>


                    <Pressable
                        style={styles.buttonList}
                        onPress={() => this.ShowVehicle(item.budget.idVehicle)}
                    >
                        <Text style={styles.listTextButton}>Ver Veículo</Text>
                    </Pressable>

                    <Modal
                        isVisible={this.state.visibleVehicle}
                        style={styles.modal}>

                        <View style={styles.modalView}>

                            <Text style={styles.modalTitle}><Text style={styles.modalTitleItem}>Modelo:</Text> {this.state.Vehicle.modelName}</Text>
                            <Text style={styles.modalText}><Text style={styles.modalItem}>Marca:</Text> {this.state.Vehicle.brandName}</Text>
                            <Text style={styles.modalText}><Text style={styles.modalItem}>Placa:</Text> {this.state.Vehicle.licensePlate}</Text>
                            <Text style={styles.modalText}><Text style={styles.modalItem}>Ano:</Text> {this.state.Vehicle.year}</Text>
                            <Text style={styles.modalText}><Text style={styles.modalItem}>Cor:</Text> {this.state.Vehicle.color}</Text>

                            <Pressable
                                style={styles.buttonClose2}
                                onPress={() => this.setState({ visibleVehicle: false })}
                            >
                                <Text style={styles.textButtonClose2}>Fechar</Text>
                            </Pressable>

                        </View>

                    </Modal>


                    <Pressable
                        style={styles.buttonList}
                        activeOpacity={0.5}
                        onPress={() => this.ViewImages(item.id)}
                    >
                        <Text style={styles.listTextButton}>Ver Imagens</Text>
                    </Pressable>


                </View>

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
        marginTop: 40,
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



    //MODAL

    picker: {
        width: '60%',
        height: 40,
        borderRadius: 5,
        backgroundColor: '#f1f1f1',
        marginTop: 12
    },

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

    buttonClose1: {
        width: '50%',
        height: 35,
        backgroundColor: '#282f66',
        borderRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#f1f1f1',
        marginTop: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textButtonClose1: {
        fontFamily: 'Nunito',
        fontSize: 20,
        fontWeight: "400",
        color: '#fff',
        marginBottom: '1%'
    },

    buttonClose2: {
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

    textButtonClose2: {
        fontFamily: 'Nunito',
        fontSize: 20,
        fontWeight: "400",
        color: '#fff',
        marginBottom: '1%'
    },

    buttonStatus: {
        width: '50%',
        height: 35,
        backgroundColor: '#282f66',
        borderRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#f1f1f1',
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textButtonStatus: {
        fontFamily: 'Nunito',
        fontSize: 20,
        fontWeight: "400",
        color: '#fff',
        marginBottom: '1%'
    },

    containerStatus: {
        height: 60
    },


    // LISTA

    buttonList: {
        width: '70%',
        marginLeft: '15%',
        marginRight: '15%',
        height: 35,
        backgroundColor: '#282f66',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 28
    },

    listTextButton: {
        fontFamily: 'Nunito',
        fontSize: 18,
        fontWeight: "400",
        color: '#fff',
        marginBottom: '1%'
    },

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
        height: 400,
        paddingRight: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#282f66',
        marginTop: 10,
        marginBottom: 30
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
        marginTop: 8
        // backgroundColor: 'lightgray'
    },

    flatItemStatus: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: "500",
        color: '#000',
        lineHeight: 28,
        textAlign: 'justify',
        // backgroundColor: 'lightgray'
    }


})