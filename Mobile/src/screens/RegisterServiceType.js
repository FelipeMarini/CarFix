import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, Image } from "react-native"
import api from "../services/api"
import AsyncStorageLib from '@react-native-async-storage/async-storage'



export default class RegisterServiceType extends Component {


    constructor(props) {

        super(props)

        this.state = {

            serviceTypeTitle: '',
            msgConfirmacao: ''

        }

    }


    RegisterServiceType = async () => {

        try {

            const answer = await api.post('/ServiceTypes', {

                typeName: this.state.serviceTypeTitle

            })

            this.setState({ msgConfirmacao: 'Tipo de serviço criado com sucesso' })

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



    render() {

        return (


            <View style={styles.container}>


                <Text style={styles.title}>Cadastro de Tipo de Serviço</Text>


                <TextInput
                    placeholder="Tipo de Serviço"
                    keyboardType="default"
                    placeholderTextColor="rgba(0,0,0,1)"
                    style={styles.input}
                    onChangeText={serviceTypeTitle => this.setState({ serviceTypeTitle })}
                ></TextInput>



                <Pressable
                    onPress={this.RegisterServiceType}
                    style={styles.button3}
                >
                    <Text style={styles.textButton3}>Cadastrar Tipo Serviço</Text>
                </Pressable>



                <Text style={styles.msgSucesso}>{this.state.msgConfirmacao}</Text>


                <Pressable
                    onPress={() => this.props.navigation.navigate("BudgetView")}
                    style={styles.button2}
                >
                    <Text style={styles.textButton}>Ver Orçamentos</Text>
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


            </View>


        )
    }
}



const styles = StyleSheet.create({

    container: {
        alignItems: 'center'
    },

    title: {
        fontFamily: 'Nunito700',
        color: "rgba(40,47,102,1)",
        fontSize: 34,
        marginTop: 95,
        marginLeft: '5%',
        marginRight: '5%',
        textAlign: 'center'
    },

    subtitle: {
        fontFamily: 'Nunito700',
        color: "#121212",
        fontSize: 15,
        textAlign: 'justify',
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: 30
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
        marginTop: 55
    },


    exitButton: {
        width: '50%',
        height: 50,
        flexDirection: 'row',
        marginLeft: '20%',
        marginTop: 70
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

    button2: {
        width: '60%',
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
        fontSize: 20,
        fontWeight: "400",
        color: '#fff',
        marginBottom: '1%'
    },

    button3: {
        width: '70%',
        height: 40,
        backgroundColor: '#282f66',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#f1f1f1',
        marginTop: 45
    },

    textButton3: {
        fontFamily: 'Nunito',
        fontSize: 20,
        fontWeight: "400",
        color: '#fff',
        marginBottom: '1%'
    },

    msgSucesso: {
        marginTop: '5%'
    }


})


