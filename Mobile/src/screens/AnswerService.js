import React, { Component } from 'react'
import { render } from 'react-dom'
import { Text, TextInput, View, StyleSheet, Pressable, Image, AppRegistry } from 'react-native'
import api from '../services/api'
import { Picker } from '@react-native-picker/picker'


export default class AnswerService extends Component {


    // fazer modais de definição de valor e prazo
    // como vou fazer para controlar e alterar o status do serviço do backend? Não há essa opção no método Answer
    // como vou determinar qual funileiro (userType: 1) irá realizar cada serviço? Não há essa opção no método Answer
    // usar o Picker para selecionar o status do serviço?
    // timeEstimate aparentemente não funciona e não é necessário para o método Answer


    constructor(props) {

        super(props)

        this.state = {

            idService: '',
            description: '',
            type: '',
            images: [],

            price: '',
            observations: '',

        }

    }


    GetService = async () => {

        try {

            const IdService = localStorage.getItem('IdService')

            console.log(IdService)

            const answer = await api.get('/Services/ServiceId/' + IdService)

            const service = answer.data

            this.setState({
                description: service.serviceDescription,
                type: service.serviceType.typeName,
                images: service.serviceImages
            })

        }

        catch (error) {

            console.log(error)

        }

    }



    AnswerService = async () => {

        try {

            const IdService = localStorage.getItem('IdService')

            console.log(IdService)

            const answer = await api.post('/Services/Answer', {

                idService: IdService,
                price: this.state.price,
                observations: this.state.observations

            })

            console.log(answer.status)

            if (answer.status == 201) {

                alert('Serviço respondido com sucesso')

                this.props.navigation.navigate('RegisterServiceType')

            }

        }


        catch (error) {

            console.log(error)

        }


    }




    componentDidMount = () => {

        this.GetService()

        const IdBudget = localStorage.getItem('IdBudget')

        console.log(IdBudget)

    }



    render() {

        return (

            <View style={styles.container}>


                <Text style={styles.title}>Responder Serviço</Text>


                {/* como mostrar as imagem do serviço aqui? */}

                <Text style={styles.subtitle}>Descrição: {this.state.description}</Text>

                <Text style={styles.subtitle}>Tipo de Serviço: {this.state.type}</Text>



                <Text style={styles.subtitle2}>Preço ($): </Text>
                {/* não deixar colocar preço zero */}
                <TextInput
                    placeholder="$"
                    keyboardType="default"
                    style={styles.input1}
                    onChangeText={price => this.setState({ price })}
                ></TextInput>


                <Text style={styles.subtitle2}>Observações: </Text>
                <TextInput
                    keyboardType="default"
                    style={styles.input2}
                    multiline={true}
                    onChangeText={observations => this.setState({ observations })}
                ></TextInput>



                <Pressable
                    style={styles.button}
                    onPress={this.AnswerService}
                >

                    <Text style={styles.textButton}>Responder Serviço</Text>
                </Pressable>


                <Text style={styles.msgSucesso}>{this.state.msgConfirmacao}</Text>


                <Pressable
                    style={styles.exitButton}
                    onPress={() => this.props.navigation.navigate('BudgetDetail')}
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
        alignItems: 'center',
        backgroundColor: "#f2f3f9"
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
        fontSize: 15,
        fontWeight: 600,
        color: "#121212",
        textAlign: 'left',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: 25
    },

    subtitle2: {
        fontFamily: "nunito-700.ttf",
        fontSize: 15,
        fontWeight: 600,
        color: "#121212",
        textAlign: 'left',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: 30
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
        marginTop: 30
    },

    textButton: {
        fontFamily: 'nunito-regular.ttf',
        fontSize: 20,
        fontWeight: 400,
        color: '#fff',
        marginBottom: '1%'
    },


    input1: {
        width: '80%',
        height: 50,
        fontFamily: "nunito-regular.ttf",
        color: "#000",
        borderWidth: 2,
        borderColor: "rgba(40,47,102,1)",
        backgroundColor: "#F5F7F9",
        borderRadius: 5,
        borderStyle: "solid",
        paddingLeft: 20,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    input2: {
        width: '85%',
        height: 120,
        fontFamily: "nunito-regular.ttf",
        color: "#000",
        borderWidth: 2,
        borderColor: "rgba(40,47,102,1)",
        backgroundColor: "#F5F7F9",
        borderRadius: 5,
        borderStyle: "solid",
        paddingLeft: 20,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    msgSucesso: {
        marginTop: '5%'
    },

    exitButton: {
        width: '50%',
        height: 50,
        flexDirection: 'row',
        marginLeft: '20%',
        marginTop: 8
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


})
