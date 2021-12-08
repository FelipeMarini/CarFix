import React, { Component } from "react"
import { StyleSheet, View, Text, TextInput, Pressable, Image } from "react-native"
import api from "../../src/services/api"
import jwtDecode from 'jwt-decode'
import AsyncStorageLib from "@react-native-async-storage/async-storage"


export default class EditVehicle extends Component {


    constructor(props) {

        super(props)

        this.state = {

            plate: '',
            model: '',
            brand: '',
            year: '',
            color: ''

        }

    }


    DeleteVehicle = async () => {

        try {

            const IdVehicle = await AsyncStorageLib.getItem('IdVehicle')

            const answer = await api.delete('/Vehicles/' + IdVehicle)

            alert('Veículo excluído com sucesso')

            this.props.navigation.navigate("Meu Perfil")

        }

        catch (error) {

            console.log(error)

        }

    }


    EditVehicle = async () => {

        try {

            const valueToken = await AsyncStorageLib.getItem('userToken')

            var idToken = jwtDecode(valueToken).jti

            const IdVehicle = await AsyncStorageLib.getItem('IdVehicle')
            // const IdVehicle = await localStorage.getItem('IdVehicle')

            if (this.state.idVehicle !== '' && this.state.model !== '' &&
                this.state.brand !== '' && this.state.year !== ''
                && this.state.color !== '' && this.state.plate !== '') {

                const answer = await api.patch('/Vehicles', { //patch ou put aqui?
                    id: IdVehicle,
                    idUser: idToken,
                    licensePlate: this.state.plate,
                    modelName: this.state.model,
                    brandName: this.state.brand,
                    year: this.state.year,
                    color: this.state.color,
                })

                alert('Veículo alterado com sucesso')

                this.props.navigation.navigate("Meu Perfil")

            }

        }

        catch (error) {

            console.log(error)

        }

    }


    componentDidMount = async () => {

        const IdVehicle = await AsyncStorageLib.getItem('IdVehicle')
        // const IdVehicle = await localStorage.getItem('IdVehicle')

        console.log(IdVehicle)

    }


    render() {

        return (

            <View style={styles.container}>

                <Text style={styles.title}>Editar Veículo</Text>

                <Text style={styles.subtitle}>
                    Altere as Informações de seu Veículo
                </Text>

                <TextInput
                    placeholder="Modelo"
                    keyboardType="default"
                    placeholderTextColor="rgba(0,0,0,1)"
                    style={styles.input}
                    onChangeText={model => this.setState({ model })}
                ></TextInput>

                <TextInput
                    placeholder="Marca"
                    placeholderTextColor="rgba(0,0,0,1)"
                    style={styles.input}
                    onChangeText={brand => this.setState({ brand })}
                ></TextInput>

                <TextInput
                    placeholder="Ano"
                    placeholderTextColor="rgba(0,0,0,1)"
                    style={styles.input}
                    onChangeText={year => this.setState({ year })}
                ></TextInput>

                <TextInput
                    placeholder="Cor"
                    placeholderTextColor="rgba(0,0,0,1)"
                    style={styles.input}
                    onChangeText={color => this.setState({ color })}
                ></TextInput>

                <TextInput
                    placeholder="Placa"
                    secureTextEntry={false}
                    placeholderTextColor="rgba(0,0,0,1)"
                    disableFullscreenUI={true}
                    keyboardType="name-phone-pad"
                    style={styles.input}
                    onChangeText={plate => this.setState({ plate })}
                ></TextInput>


                <Pressable
                    onPress={this.EditVehicle}
                    style={styles.button}
                >
                    <Text style={styles.textButton}>Editar Veículo</Text>
                </Pressable>


                <Pressable
                    onPress={this.DeleteVehicle}
                    style={styles.button2}
                >
                    <Text style={styles.textButton}>Excluir Veículo</Text>
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

            </View>

        )

    }
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center'
    },

    title: {
        fontFamily: 'Nunito700',
        color: "rgba(40,47,102,1)",
        fontSize: 34,
        marginTop: 50,
        marginLeft: '5%',
        marginRight: '5%',
        textAlign: 'center'
    },

    subtitle: {
        fontFamily: 'Nunito700',
        fontWeight: "600",
        color: "#121212",
        fontSize: 14,
        textAlign: 'justify',
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: 8
    },

    input: {
        width: '80%',
        height: 50,
        fontFamily: "Nunito",
        color: "#121212",
        borderWidth: 2,
        borderColor: "rgba(40,47,102,1)",
        backgroundColor: "#F5F7F9",
        borderRadius: 5,
        borderStyle: "solid",
        paddingLeft: 20,
        marginTop: 16
    },

    exitButton: {
        width: '50%',
        height: 50,
        flexDirection: 'row',
        marginLeft: '20%',
        marginTop: 10
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
        width: '50%',
        height: 40,
        backgroundColor: '#282f66',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#f1f1f1',
        marginTop: 45
    },

    button2: {
        width: '50%',
        height: 40,
        backgroundColor: '#282f66',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#f1f1f1',
        marginTop: 30
    },

    textButton: {
        fontFamily: 'Nunito',
        fontSize: 22,
        fontWeight: "400",
        color: '#fff',
        marginBottom: '1%'
    }


})



