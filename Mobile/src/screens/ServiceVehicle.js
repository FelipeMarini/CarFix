import React, { Component } from 'react'
import { View, StyleSheet, Text, Pressable, FlatList, Image } from 'react-native'
import api from '../services/api'
import AsyncStorageLib from '@react-native-async-storage/async-storage'


export default class ServiceVehicle extends Component {

    // mostrar o status serviço aqui e fazer um filtro!

    // pode deletar o serviço? ou só mostra os serviços ativos?

    // fazer modal para a descrição - UX/UI


    constructor(props) {

        super(props)

        this.state = {

            listServices: [],
            Budget: [],
            Vehicle: []

        }

    }


    GetVehicle = async () => {

        try {

            const IdCar = await AsyncStorageLib.getItem('IdVehicle')

            // console.log(IdCar)

            const answer = await api.get('/Vehicles/VehicleId/' + IdCar)

            // console.log(answer.data)

            this.setState({ Vehicle: answer.data })

            // console.log(this.state.Vehicle)

        }

        catch (error) {

            console.log(error)

        }

    }


    GetBudgetTotal = async () => {

        try {

            const IdCar = await AsyncStorageLib.getItem('IdVehicle')

            const answerBudget = await api.get('/Budgets/Vehicle/' + IdCar)

            const dataBudget = answerBudget.data

            // console.log(dataBudget)

            this.setState({ Budget: dataBudget })

            // console.log(this.state.Budget)

        }

        catch (error) {

            console.log(error)

        }

    }


    GetIdVehicle = async () => {

        try {

            const IdCar = await AsyncStorageLib.getItem('IdVehicle')

            // console.log(IdCar)

            this.props.navigation.navigate("RegisterService")

        }

        catch (error) {

            console.log(error)

        }

    }


    GetServicesVehicle = async () => {

        try {

            const IdCar = await AsyncStorageLib.getItem('IdVehicle')

            console.log(IdCar)

            const answer = await api.get('/Services/Vehicle/' + IdCar)

            const dataServices = answer.data

            console.log(dataServices)

            this.setState({ listServices: dataServices })

            console.log(this.state.listServices)

        }

        catch (error) {

            console.log(error)

        }

    }



    AddImage = async (id) => {

        try {

            console.log(id)

            await AsyncStorageLib.setItem('IdService', id)

            this.props.navigation.navigate("Camera")

        }

        catch (error) {

            console.log(error)

        }

    }


    ViewImages = async (id) => {

        try {

            console.log(id)

            await AsyncStorageLib.setItem('IdService', id)

            this.props.navigation.navigate("EditServiceImage")

        }

        catch (error) {

            console.log(error)

        }

    }


    DeleteService = (id) => {

        try {

            console.log(id)

            const dataServices = this.state.listServices

            let filterArray = dataServices.filter((val, i) => {

                if (val.id !== id) {

                    return val

                }

            })

            console.log('filterArray', filterArray)

            const answer = api.delete('/Services/' + id)

            this.setState({ listServices: filterArray })

        }

        catch (error) {

            console.log(error)

        }

    }


    componentDidMount = () => {

        this.GetServicesVehicle()

        this.GetBudgetTotal()

        this.GetVehicle()

    }



    render() {

        return (

            <View style={styles.container}>

                <Text style={styles.title}>Serviços do Veículo</Text>


                <Text style={styles.subtitle1}>
                    Valor Orçamento: ${this.state.Budget.totalValue}
                </Text>

                <Text style={styles.subtitle}>
                    Modelo: {this.state.Vehicle.modelName}
                </Text>

                <Text style={styles.subtitle}>
                    Marca: {this.state.Vehicle.brandName}
                </Text>

                <Text style={styles.subtitle}>
                    Ano: {this.state.Vehicle.year}
                </Text>

                <Pressable
                    style={styles.button}
                    activeOpacity={0.5}
                    onPress={this.GetIdVehicle}
                >
                    <Text style={styles.textButton}>Solicitar Novo Serviço</Text>
                </Pressable>


                <Pressable
                    style={styles.button}
                    activeOpacity={0.5}
                    onPress={() => this.props.navigation.navigate('Whats')}
                >
                    <Text style={styles.textButton}>Agendar Visita</Text>
                </Pressable>


                <Pressable
                    style={styles.exitButton}
                    onPress={() => this.props.navigation.navigate('Meus Veículos')}
                >
                    <Image
                        source={require('../../assets/images/back.png')}
                        style={styles.arrow}
                    />

                    <Text style={styles.exitText}>Voltar</Text>
                </Pressable>




                {/* LISTA */}

                <View style={styles.mainBody}>

                    <FlatList
                        contentContainerStyle={styles.mainBodyContent}
                        data={this.state.listServices}
                        keyExtractor={item => item.id}
                        renderItem={this.renderItem}
                    // extraData={this.state}
                    />

                </View>

                {/* FIM LISTA */}



            </View>

        )

    }



    renderItem = ({ item }) => (

        <View style={styles.flatItemRow}>

            <View style={styles.flatItemContainer}>

                <Text style={styles.flatItemTitle}>Valor Serviço: ${item.price}</Text>
                <Text style={styles.flatItemInfo}>Data Solicitação: {Intl.DateTimeFormat('pt-BR').format(new Date(item.creationDate))}</Text>
                <Text style={styles.flatItemInfo}>Descrição: {item.serviceDescription}</Text>


                <Text style={styles.flatItemInfo}>Status Serviço: {item.serviceStatus}</Text>



                <Text style={styles.flatItemInfo}>Tipo Serviço: {item.serviceType.typeName}</Text>
                <Text style={styles.flatItemInfo}>Observações Funilaria: {item.observations}</Text>

                {/* <Text style={styles.flatItemInfo}>Imagens do Serviço:
                    {item.serviceImages.map((img) => { img.imagePath })}
                </Text> */}

                <Pressable
                    style={styles.buttonList}
                    activeOpacity={0.5}
                    onPress={() => this.AddImage(item.id)}
                >
                    <Text style={styles.listTextButton}>Enviar Imagens</Text>
                </Pressable>

                <Pressable
                    style={styles.buttonList}
                    activeOpacity={0.5}
                    onPress={() => this.ViewImages(item.id)}
                >
                    <Text style={styles.listTextButton}>Editar Imagens</Text>
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