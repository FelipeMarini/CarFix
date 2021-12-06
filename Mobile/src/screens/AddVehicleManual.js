import React, { Component } from "react"
import { StyleSheet, View, Text, TextInput, Pressable, Image } from "react-native"
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import api from "../services/api"
import jwtDecode from 'jwt-decode'


export default class AddVehicleManual extends Component {


    constructor(props) {

        super(props)

        this.state = {

            idUserLogged: '',
            model: '',
            brand: '',
            year: '',
            color: '',
            plate: '',
            msgConfirmacao: ''

        }

    }


    RegisterVehicle = async () => {

        try {

            if (this.state.idUserLogged !== '' && this.state.model !== '' &&
                this.state.brand !== '' && this.state.year !== ''
                && this.state.color !== '' && this.state.plate !== '') {

                const answer = await api.post('/Vehicles', {
                    licensePlate: this.state.plate,
                    modelName: this.state.model,
                    brandName: this.state.brand,
                    year: this.state.year,
                    color: this.state.color,
                    idUser: this.state.idUserLogged
                })

                this.setState({ msgConfirmacao: 'Veículo cadastrado com sucesso' })

            }

        }

        catch (error) {

            console.log(error)

        }

    }


    GetIdUserLogged = async () => {

        try {

            const valueToken = await AsyncStorageLib.getItem('userToken')

            var idToken = jwtDecode(valueToken).jti

            this.setState({ idUserLogged: idToken })

            this.state.dataProfile = await api.get('/Users/' + this.state.idUserLogged)

            this.setState({ idUserLogged: this.state.dataProfile.data.id })

            console.log(this.state.idUserLogged)

        }

        catch (error) {

            console.log(error)

        }

    }


    componentDidMount = () => {

        this.GetIdUserLogged()

    }



    render() {

        return (

            <View style={styles.container}>

                <Text style={styles.title}>Adicionar Veículo</Text>

                <Text style={styles.subtitle}>
                    Adicione as Informações de seu Veículo
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
                    onPress={this.RegisterVehicle}
                    style={styles.button}
                >
                    <Text style={styles.textButton}>Salvar Veículo</Text>
                </Pressable>


                <Text style={styles.msgSucesso}>{this.state.msgConfirmacao}</Text>


                <Pressable
                    style={styles.exitButton}
                    onPress={() => this.props.navigation.navigate('AddVehicleMenu')}
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
        marginTop: 15,
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
        marginTop: 10
    },

    input: {
        width: '80%',
        height: 50,
        fontFamily: 'Nunito',
        color: "#121212",
        borderWidth: 2,
        borderColor: "rgba(40,47,102,1)",
        backgroundColor: "#F5F7F9",
        borderRadius: 5,
        borderStyle: "solid",
        paddingLeft: 20,
        marginTop: 22
    },

    exitButton: {
        width: '50%',
        height: 50,
        flexDirection: 'row',
        marginLeft: '20%',
        marginTop: 2
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
        marginTop: 30
    },

    textButton: {
        fontFamily: 'Nunito',
        fontSize: 22,
        fontWeight: "400",
        color: '#fff',
        marginBottom: '1%'
    },

    msgSucesso: {
        marginTop: '5%'
    }


})



