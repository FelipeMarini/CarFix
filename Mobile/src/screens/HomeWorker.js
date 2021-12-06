import React, { Component } from 'react'
import { render } from 'react-dom'
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
// import SearchBar from '../../src/components/SearchBar'


export default class HomeAdm extends Component {


    constructor(props) {

        super(props)

        this.state = {



        }

    }




    render() {


        return (

            <View style={styles.container}>

                <Text style={styles.title}>Serviços</Text>

                <ScrollView>

                    <View style={styles.cardBudget}>

                        <View style={styles.budgetDateTime}>

                            <Text style={styles.titleCard}>Orçamento #001</Text>

                            <Text style={styles.vehicle}>Veículo: Chevrolet Onix</Text>

                            <Text style={styles.plate}>Placa: ABC-1234</Text>

                            <Text style={styles.client}>Cliente: Yuri Martins</Text>

                        </View>

                        <View style={styles.budgetStatusValue}>

                            <Text style={styles.status}>Status: Em Andamento</Text>

                            <TouchableOpacity style={styles.detailsLink}>
                                <Text style={styles.detailsText}>Mais Detalhes</Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                </ScrollView>


            </View>


        )

    }

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#f2f3f9"
    },

    title: {
        marginTop: 40,
        fontFamily: 'Nunito700',
        fontSize: 34,
        fontStyle: "normal",
        fontWeight: "600",
        color: "#282F66",
        marginLeft: '8%'
    },

    cardBudget: {
        backgroundColor: '#fdfcff',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        width: '95%',
        height: 120,
        marginTop: 35,
        marginLeft: '2.5%',
        marginRight: '2.5%',
        flexDirection: 'row',
        justifyContent: 'center',

    },

    budgetDateTime: {
        justifyContent: 'space-evenly',
        marginRight: '8%'
    },

    budgetStatusValue: {
        justifyContent: 'space-evenly'
    },

    titleCard: {
        fontFamily: 'Nunito',
        fontSize: 16
    },


    vehicle: {
        fontFamily: 'Nunito',
        fontSize: 12
    },

    plate: {
        fontFamily: 'Nunito',
        fontSize: 12
    },

    client: {
        fontFamily: 'Nunito',
        fontSize: 12
    },


    status: {
        fontFamily: 'Nunito',
        fontSize: 12
    },

    value: {
        fontFamily: 'Nunito',
        fontSize: 12
    },

    detailsText: {
        fontFamily: 'Nunito',
        fontSize: 14,
        color: '#282f66'
    },

    exitButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '5%'
    },

    exitImg: {
        width: '55%',
        height: 55,
        paddingTop: '5%'
    },

    exitTextButton: {
        fontFamily: 'Nunito',
        fontSize: 15,
        fontWeight: "600",
        color: '#000',
        paddingTop: '40%',
        paddingLeft: '6%'
    }


})
