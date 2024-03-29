import React, { Component } from "react"
import { StyleSheet, View, Text, Image, Pressable, TextInput, ActivityIndicator } from "react-native"
import { Picker } from '@react-native-picker/picker'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import api from '../../src/services/api'
import Modal from 'react-native-modal'
// import { style } from "dom-helpers"


export default class RegisterService extends Component {


    //se deleto os veículos do orçamento, os serviços e o orçamento acabam sendo deletados também


    constructor(props) {

        super(props)

        this.state = {

            Vehicle: [],
            idServiceType: '',
            listServiceTypes: [],
            listVehiclesUser: [],
            serviceDescription: '',
            idBudget: '',
            visible: false,
            visibleDescription: false,
            visibleDescription2: false,
            isLoadingService: false

        }

    }


    ShowVehicle = async () => {

        try {

            await this.setState({ visible: true })

        }

        catch (error) {

            console.log(error)

        }

    }

    ShowDescription = async () => {

        try {

            await this.setState({ visibleDescription: true })

        }

        catch (error) {

            console.log(error)

        }

    }

    ShowModal = async () => {

        try {

            await this.setState({ visibleDescription2: true })

        }

        catch (error) {

            console.log(error)

        }

    }


    GetServiceTypes = async () => {   //precisa usar async e await

        try {

            const answer = await api.get('/ServiceTypes')

            const dataServiceTypes = answer.data

            this.setState({ idServiceType: dataServiceTypes[0].id })

            this.setState({ listServiceTypes: dataServiceTypes })

        }

        catch (error) {

            console.log(error)

        }

    }


    GetVehicle = async () => {

        try {

            const IdVehicle = await AsyncStorageLib.getItem('IdVehicle')
            // const IdVehicle = await localStorage.getItem('IdVehicle')

            console.log(IdVehicle)

            const answer = await api.get('/Vehicles/VehicleId/' + IdVehicle)

            this.setState({ Vehicle: answer.data })

        }

        catch (error) {

            console.log(error)

        }

    }


    PutDescription = async () => {

        try {

            if (this.state.serviceDescription !== '') {

                alert('Descrição inserida com sucesso')

                await this.setState({ visibleDescription: false })

            }

            else {

                this.setState({ visibleDescription: false })

            }

        }

        catch (error) {

            console.log(error)

        }

    }


    RegisterService = async () => {

        this.setState({ isLoadingService: true })

        try {

            const IdVehicle = await AsyncStorageLib.getItem('IdVehicle')
            // const IdVehicle = await localStorage.getItem('IdVehicle')

            console.log(IdVehicle)

            const answer = await api.get('/Services/Vehicle/' + IdVehicle)

            if (answer.data[0] !== undefined) {
                var IdBudget = answer.data[0].idBudget
            }

            this.setState({ idBudget: IdBudget })

            console.log(this.state.idBudget)

            if (this.state.serviceDescription !== '' && IdBudget != null) {

                const register = await api.post('/Services', {

                    idBudget: this.state.idBudget,
                    idServiceType: this.state.idServiceType,
                    idVehicle: IdVehicle,
                    idBudget: this.state.idBudget,
                    serviceDescription: this.state.serviceDescription

                })

                if (register.status == 201) {
                    await this.setState({ isLoading: false })

                    await alert('Seu serviço foi solicitado e será respondido em breve, adicione imagens para nos auxiliar no orçamento')

                    await this.props.navigation.navigate("Meus Veículos")
                }


            }

            if (this.state.serviceDescription !== '' && IdBudget == null) {

                const register = await api.post('/Services', {

                    idServiceType: this.state.idServiceType,
                    idVehicle: IdVehicle,
                    serviceDescription: this.state.serviceDescription

                })

                if (register.status == 201) {

                    await this.setState({ isLoading: false })

                    await alert('Seu serviço foi solicitado e será respondido em breve, adicione imagens para nos auxiliar no orçamento')

                    await this.props.navigation.navigate("Meus Veículos")
                }


            }

            await this.setState({ isLoadingService: false })

        }

        catch (error) {

            console.log(error)

        }

    }




    componentDidMount = () => {

        this.GetServiceTypes()

        this.GetVehicle()

    }




    render() {

        return (

            <View style={styles.container}>


                <Text style={styles.title}>Solicitar Serviço</Text>


                {/* <Text style={styles.subtitle}>Veículo: {this.state.Vehicle.modelName}</Text>

                <Text style={styles.subtitle}>Marca: {this.state.Vehicle.brandName}</Text>

                <Text style={styles.subtitle}>Ano: {this.state.Vehicle.year}</Text>

                <Text style={styles.subtitle}>Cor: {this.state.Vehicle.color}</Text> */}

                <Pressable
                    style={styles.button2}
                    onPress={() => this.ShowVehicle()}
                >
                    <Text style={styles.textButton2}>Ver Veículo</Text>
                </Pressable>


                <Modal
                    isVisible={this.state.visible}
                    style={styles.modal}>

                    <View style={styles.modalView}>

                        <Text style={styles.modalText}><Text style={styles.modalItem}>Marca:</Text> {this.state.Vehicle.brandName}</Text>
                        <Text style={styles.modalText}><Text style={styles.modalItem}>Modelo:</Text> {this.state.Vehicle.modelName}</Text>
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


                <Text style={styles.subtitle2}>Tipo de Serviço:</Text>

                <Picker
                    style={styles.picker}
                    selectedValue={this.state.idServiceType}
                    onValueChange={(itemValue) => this.setState({ idServiceType: itemValue })}>

                    {
                        this.state.listServiceTypes.map((item, index) => {

                            return <Picker.Item value={item.id} label={item.typeName} key={index} />

                        })
                    }
                </Picker>


                <Pressable
                    style={styles.button2}
                    onPress={() => this.ShowDescription()}
                >
                    <Text style={styles.textButton2}>Inserir Descrição</Text>
                </Pressable>


                <Modal
                    isVisible={this.state.visibleDescription}
                    style={styles.modal2}
                >

                    <View style={styles.modalView2}>

                        <Text style={styles.description}>Descreva brevemente o serviço que gostaria para seu veículo:</Text>

                        <TextInput
                            style={styles.inputDescription}
                            multiline={true}
                            onChangeText={serviceDescription => this.setState({ serviceDescription })}
                        >
                        </TextInput>

                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => this.PutDescription()}
                        >
                            <Text style={styles.textButtonClose}>Fechar</Text>
                        </Pressable>

                    </View>

                </Modal>


                <Pressable
                    style={styles.button2}
                    onPress={() => this.ShowModal()}
                >
                    <Text style={styles.textButton2}>Ver Descrição</Text>
                </Pressable>


                <Modal
                    isVisible={this.state.visibleDescription2}
                    style={styles.modal2}
                >

                    <View style={styles.modalView2}>

                        <Text style={styles.description}>Descrição do Serviço:</Text>

                        <TextInput
                            style={styles.inputDescription}
                        >
                            {this.state.serviceDescription}
                        </TextInput>

                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => this.setState({ visibleDescription2: false })}
                        >
                            <Text style={styles.textButtonClose}>Fechar</Text>
                        </Pressable>

                    </View>

                </Modal>


                <Pressable
                    style={styles.button}
                    onPress={this.RegisterService}
                >

                    <Text style={styles.textButton}>Registrar Serviço</Text>
                </Pressable>

                <ActivityIndicator
                    style={styles.spinner}
                    size={'large'}
                    color={'#282f66'}
                    animating={this.state.isLoadingService}
                >
                </ActivityIndicator>


            </View>

        )

    }

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "rgba(242,243,249,1)"
    },

    title: {
        fontFamily: 'Nunito700',
        color: "rgba(40,47,102,1)",
        fontSize: 34,
        marginTop: 55,
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
        textDecorationLine: 'underline',
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: 6
    },

    subtitle2: {
        fontFamily: 'Nunito700',
        fontSize: 22,
        fontWeight: "600",
        color: "#282f66",
        textAlign: 'justify',
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: 20
    },

    description: {
        fontFamily: 'Nunito700',
        fontSize: 18,
        fontWeight: "600",
        color: "#282f66",
        textAlign: 'center',
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: 5
    },

    select: {
        width: '60%',
        height: 30,
        marginTop: 5
    },

    inputDescription: {
        width: '80%',
        height: 140,
        borderColor: 'black',
        borderWidth: 1,
        textAlign: 'center',
        marginTop: 15
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
        marginTop: 40
    },

    textButton: {
        fontFamily: 'Nunito',
        fontSize: 20,
        fontWeight: "400",
        color: '#fff',
        marginBottom: '1%'
    },

    button2: {
        width: '60%',
        height: 40,
        backgroundColor: '#282f66',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#f1f1f1',
        marginTop: 32
    },

    textButton2: {
        fontFamily: 'Nunito',
        fontSize: 20,
        fontWeight: "400",
        color: '#fff',
        marginBottom: '1%'
    },


    picker: {
        width: '60%',
        height: 40,
        borderRadius: 5,
        backgroundColor: '#f1f1f1',
        marginTop: 12
    },

    exitButton: {
        width: '50%',
        height: 50,
        flexDirection: 'row',
        marginLeft: '20%',
        marginTop: 20
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

    // MODAL

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

    modal2: {
        width: '80%',
        marginRight: '10%',
        marginLeft: '10%',
        // backgroundColor: 'lightgreen'
    },

    modalView2: {
        width: '100%',
        height: '80%',
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

    spinner: {
        marginTop: 8
    }


})

