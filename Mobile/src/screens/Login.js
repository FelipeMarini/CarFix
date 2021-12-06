import React, { Component } from "react"
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native"
import api from '../services/api'
import jwtDecode from 'jwt-decode'
import AsyncStorageLib from "@react-native-async-storage/async-storage"
// import AppLoading from 'expo-app-loading'    //vou usar isso?
// import Modal from 'react-native-modal'



export default class Login extends Component {  // elaborar telas do funileiro


    //integrar com whats para agendar visita depois de receber o orçamento do funileiro
    // fazer método de recuperar senha e confirmar senha
    // aprender métodos de curtidas e contagem (Instadev)
    // fazer a lógica "isLoading" para desabilitar os botões quando faltar algum campo para ser preenchido
    // para deletar um usuário vou ter que deletar os veículos dele antes
    // testar para ver se a "borda laranja" do input some no dispositivo ao invés de web
    // testar no cel e com o banco na nuvem da AWS

    constructor(props) {

        super(props)

        this.state = {

            email: '',
            password: '',
            role: '',
            visible: false

        }
    }


    RealizeLogin = async () => {

        try {

            const answer = await api.post('/Login', {
                email: this.state.email,
                password: this.state.password
            })

            const token = answer.data.token

            await AsyncStorageLib.setItem('userToken', token)

            this.props.navigation.navigate('Main')

            const valueToken = await AsyncStorage.getItem('userToken')


            if (valueToken !== null) {

                this.setState({ role: jwtDecode(valueToken).role })


            }

            if (this.state.role === "Administrador") {

                this.props.navigation.navigate('RegisterServiceType')
            }

            if (this.state.role === "Funileiro") {

                this.props.navigation.navigate('HomeWorker')
            }

            if (this.state.role === "Usuario") {

                this.props.navigation.navigate('Main')
            }

        }

        catch (error) {

            console.log(error)
        }

    }



    render() {

        return (

            <View style={styles.container}>

                <View style={styles.titleStack}>

                    <Text style={styles.title}>Bem vindo ao CarFix!</Text>

                    <Text style={styles.subtitle}>
                        Insira suas credenciais para acessar o App
                    </Text>

                </View>

                <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    style={styles.input}
                    onChangeText={email => this.setState({ email })}
                ></TextInput>

                <TextInput
                    placeholder="Senha"
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={password => this.setState({ password })}
                ></TextInput>

                <Pressable
                    style={styles.button}
                    onPress={this.RealizeLogin}
                >
                    <Text style={styles.textButton}>Entrar</Text>
                </Pressable>


                {/* <Pressable
                    style={styles.button}
                    onPress={() => this.setState({ visible: true })}
                >
                    <Text style={styles.textButton}>Abrir</Text>
                </Pressable>

                <Modal
                    isVisible={this.state.visible}
                    style={styles.modal}>

                    <View style={styles.modalView}>

                        <Text style={styles.modalText}>Hello!</Text>

                        <Pressable
                            style={styles.button}
                            onPress={() => this.setState({ visible: false })}
                        >
                            <Text style={styles.textButton}>Fechar</Text>
                        </Pressable>

                    </View>
                </Modal> */}

                <Pressable
                    onPress={() => this.props.navigation.navigate("RecoverPassword")}
                    style={styles.forgetPassBtn}
                >
                    <Text style={styles.esqueciMinhaSenha}>Esqueci minha Senha</Text>
                </Pressable>

                <Pressable
                    onPress={() => this.props.navigation.navigate("CreateAccount")}
                    style={styles.forgetPassBtn}
                >
                    <Text style={styles.esqueciMinhaSenha}>Criar Conta</Text>
                </Pressable>



            </View>

        )

    }

}



const styles = StyleSheet.create({

    container: {
        alignItems: 'center'
    },

    title: {
        fontFamily: "",
        color: "rgba(40,47,102,1)",
        fontSize: 34,
        textAlign: 'center'
    },

    subtitle: {
        fontFamily: "",
        fontWeight: "500",
        color: "#121212",
        fontSize: 15,
        marginTop: 20,
        textAlign: 'center'
    },

    titleStack: {
        width: 321,
        height: 80,
        marginTop: 90,
        marginBottom: 20
    },

    input: {
        width: '80%',
        height: 50,
        fontFamily: "",
        color: "#121212",
        borderWidth: 2,
        borderColor: "rgba(40,47,102,1)",
        backgroundColor: "#F5F7F9",
        borderRadius: 5,
        borderStyle: "solid",
        paddingLeft: 20,
        marginTop: 25
    },

    forgetPassBtn: {
        width: '50%',
        height: 35,
        marginTop: 50
    },

    esqueciMinhaSenha: {
        fontFamily: "",
        fontSize: 18,
        fontWeight: "600",
        color: "rgba(40,47,102,1)",
        textAlign: 'center'
    },

    criarUmaConta: {
        fontFamily: "",
        fontSize: 18,
        fontWeight: "600",
        color: "rgba(40,47,102,1)",
        marginTop: 20,
        textAlign: 'center'
    },

    newAccountBTN: {
        width: '50%',
        height: 35,
        marginTop: 11
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
        fontFamily: "",
        fontSize: 22,
        fontWeight: "400",
        color: '#fff',
        marginBottom: '1%'
    },

    modalView: {
        backgroundColor: 'lightgreen',
        height: 100
    }


})
