import React, { Component } from "react"
import { StyleSheet, View, Text, Image, Pressable, TextInput } from "react-native"
import { Picker } from '@react-native-picker/picker'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import api from '../../src/services/api'
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
            idBudget: ''

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

            // const IdVehicle = await AsyncStorageLib.getItem('IdVehicle')
            const IdVehicle = await localStorage.getItem('IdVehicle')

            console.log(IdVehicle)

            const answer = await api.get('/Vehicles/VehicleId/' + IdVehicle)

            this.setState({ Vehicle: answer.data })

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


    RegisterService = async () => {

        try {

            // const IdVehicle = await AsyncStorageLib.getItem('IdVehicle')
            const IdVehicle = await localStorage.getItem('IdVehicle')

            const answer = await api.get('/Budgets/Vehicle/' + IdVehicle)

            var dataBudgetVehicle = answer.data

            // se já houver um orçamento cadastrado para o veículo, idBudget permanecerá o mesmo
            if (dataBudgetVehicle.id !== null) {


                this.setState({ idBudget: dataBudgetVehicle.id })


                if (this.state.serviceDescription !== '') {

                    const registerServiceWithIdBudget = await api.post('/Services', {

                        idBudget: this.state.idBudget,
                        idServiceType: this.state.idServiceType,
                        idVehicle: IdVehicle,
                        idBudget: this.state.idBudget,
                        serviceDescription: this.state.serviceDescription

                    })

                    alert('Seu serviço foi solicitado e será respondido em breve, adicione imagens para nos auxiliar no orçamento')

                    this.props.navigation.navigate("Meus Veículos")

                }

            }

            else {

                // nesse caso, como o carro não possuia nenhum orçamento antes, um idBudget será gerado
                if (this.state.serviceDescription !== '') {

                    const registerServiceWithoutIdBudget = await api.post('/Service', {

                        idServiceType: this.state.idServiceType,
                        idVehicle: IdRequestVehicle,
                        serviceDescription: this.state.serviceDescription

                    })

                }

                alert('Seu serviço foi solicitado e será respondido em breve, adicione imagens para nos auxiliar no orçamento')

                this.props.navigation.navigate("ServiceVehicle")

            }

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


                <Text style={styles.subtitle}>Veículo: {this.state.Vehicle.modelName}</Text>

                <Text style={styles.subtitle}>Marca: {this.state.Vehicle.brandName}</Text>

                <Text style={styles.subtitle}>Ano: {this.state.Vehicle.year}</Text>

                <Text style={styles.subtitle}>Cor: {this.state.Vehicle.color}</Text>


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

                <Text style={styles.description}>Descreva brevemente o serviço que gostaria para seu veículo:</Text>

                <TextInput
                    style={styles.inputDescription}
                    multiline={true}
                    onChangeText={serviceDescription => this.setState({ serviceDescription })}
                >

                </TextInput>



                <Pressable
                    style={styles.button}
                    onPress={this.RegisterService}
                >

                    <Text style={styles.textButton}>Registrar Serviço</Text>
                </Pressable>


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
        marginTop: 10
    },

    description: {
        fontFamily: 'Nunito700',
        fontSize: 18,
        fontWeight: "600",
        color: "#282f66",
        textAlign: 'center',
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: 15
    },

    select: {
        width: '60%',
        height: 30,
        marginTop: 5
    },

    inputDescription: {
        width: '80%',
        height: 100,
        borderColor: 'black',
        borderWidth: 1,
        textAlign: 'center',
        marginTop: 5
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
        marginTop: 5
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


})

