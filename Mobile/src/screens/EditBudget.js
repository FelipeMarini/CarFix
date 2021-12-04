import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'


export default class EditBudget extends Component {

    // haverá opção de aprovar ou não o orçamento?
    // no botão agendar visita faremos um link com chatbot ou whatsapp? 
    // fazer uma lógica de aparecer mensagens:
    // se os status de todos os serviços estiverem "finalizados" -> "Os serviços deste orçamento foram concluídos"
    // se os status de todos os serviços estiverem "na fila" -> "Não aprovou o orçamento   recebido ou possui alguma dúvida? Fale conosco(link) ou agende uma visita(link)"
    // se houver algum status "em andamento" -> "Seus serviços estão sendo realizados. Dúvidas ou informações de seus serviços? Fale conosco(link) ou agende uma visita(link)"


    constructor(props) {

        super(props)

        this.state = {



        }

    }


    componentDidMount = () => {



    }


    render() {

        return (


            <View style={styles.container}>



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
        marginTop: 10,
        fontFamily: 'nunito-700.ttf',
        fontSize: 30,
        fontStyle: "normal",
        fontWeight: "600",
        color: "#282F66"
    }


})
