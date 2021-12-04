import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, Image } from "react-native"
import api from "../services/api"




export default class CreateAccount extends Component {

    // fazer a função de limpar os inputs! não está funcionando

    // fazer método de desabilitar botão se todos os campos não estiverem preenchidos

    constructor(props) {

        super(props)

        this.state = {

            username: '',
            email: '',
            password: '',
            // passwordRepeat: '',
            userType: 2,        //sempre um usuário (2) que fará um cadastro
            phoneNumber: '',
            msgConfirmacao: ''
        }

    }


    RegisterUser = async () => {  // dava erro sem async/await e definir const 'answer' no axios

        try {

            const answer = await api.post('/Users', {
                Username: this.state.username,
                Email: this.state.email,
                Password: this.state.password,
                UserType: this.state.userType,
                PhoneNumber: this.state.phoneNumber
            })

            this.setState({ msgConfirmacao: 'Conta criada com sucesso' })

        }

        catch (error) {

            console.log(error)

        }

    }


    ValidatePassword = () => { //concluir o método de confirmar senha!

        var typedPassword = this.state.password

        var repeatedTypedPassword = this.state.passwordRepeat

        if (typedPassword !== repeatedTypedPassword) {

        }
    }



    componentDidMount = () => {

    }



    render() {

        return (

            <View style={styles.container}>

                <Text style={styles.title}>Cadastre uma conta</Text>

                <Text style={styles.subtitle}>
                    Crie uma conta para solicitar orçamentos
                </Text>


                <TextInput
                    placeholder="Nome"
                    keyboardType="default"
                    placeholderTextColor="rgba(0,0,0,1)"
                    style={styles.input}
                    onChangeText={username => this.setState({ username })}
                ></TextInput>

                <TextInput
                    placeholder="Email"
                    keyboardType="default"
                    placeholderTextColor="rgba(0,0,0,1)"
                    style={styles.input}
                    onChangeText={email => this.setState({ email })}
                ></TextInput>

                <TextInput
                    // onSubmitEditing ={} confirmar senha
                    placeholder="Senha"
                    secureTextEntry={true}
                    placeholderTextColor="rgba(0,0,0,1)"
                    disableFullscreenUI={true}
                    style={styles.input}
                    onChangeText={password => this.setState({ password })}
                ></TextInput>

                {/* <TextInput
                    onSubmitEditing={}
                    placeholder="Confirmar Senha"
                    secureTextEntry={true}
                    placeholderTextColor="rgba(0,0,0,1)"
                    disableFullscreenUI={true}
                    style={styles.input}
                    onChange={passwordRepeat => this.setState({ passwordRepeat })}
                ></TextInput> */}

                <TextInput
                    placeholder="Celular"
                    secureTextEntry={false}
                    placeholderTextColor="rgba(0,0,0,1)"
                    disableFullscreenUI={true}
                    keyboardType="default"
                    style={styles.input}
                    onChangeText={phoneNumber => this.setState({ phoneNumber })}
                ></TextInput>


                <Pressable
                    onPress={this.RegisterUser}
                    style={styles.button}

                >
                    <Text style={styles.textButton}>Criar Conta</Text>
                </Pressable>


                <Text style={styles.msgSucesso}>{this.state.msgConfirmacao}</Text>


                <Pressable
                    style={styles.exitButton}
                    onPress={() => this.props.navigation.navigate('Login')}
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
        alignItems: 'center'
    },

    title: {
        fontFamily: "nunito-700.ttf",
        color: "rgba(40,47,102,1)",
        fontSize: 34,
        marginTop: 25,
        marginLeft: '5%',
        marginRight: '5%',
        textAlign: 'center'
    },

    subtitle: {
        fontFamily: "nunito-700.ttf",
        fontSize: 18,
        fontWeight: "600",
        color: "#121212",
        textAlign: 'justify',
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: 20
    },

    input: {
        width: '80%',
        height: 50,
        fontFamily: "nunito-regular.ttf",
        color: "#121212",
        borderWidth: 2,
        borderColor: "rgba(40,47,102,1)",
        backgroundColor: "#F5F7F9",
        borderRadius: 5,
        borderStyle: "solid",
        paddingLeft: 20,
        marginTop: 25
    },

    msgSucesso: {
        marginTop: '5%'
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

    button: {
        width: '50%',
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
        fontFamily: 'nunito-regular.ttf',
        fontSize: 22,
        fontWeight: "400",
        color: '#fff',
        marginBottom: '1%'
    }


})



