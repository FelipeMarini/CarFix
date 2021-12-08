import AsyncStorageLib from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable, Image, FlatList, ScrollView } from 'react-native'
import api from '../services/api'
// import SearchBar from '../../src/components/SearchBar'  pensar em filtros de pesquisa



export default class BudgetView extends Component {


    // fazer a lógica dos status, se todos os serviços estiverem finalizados por exemplo, o status do orçamento será finalizado também
    // não consigo deletar o orçamento, alterar no backend ou simplesmente não usar o delete, pq tem ids atrelados com o budget
    // o orçamento será o total do preço dos serviços determinados em AnswerService
    // fazer filtros de pesquisa para os orçamentos e serviços (de acordo com o status)

    constructor(props) {

        super(props)

        this.state = {

            listBudgets: []

        }

    }


    GetListBudgets = async () => {   //usar async e await!

        try {

            const answer = await api.get('/Budgets')

            console.log(answer.data)

            this.setState({ listBudgets: answer.data })

            console.log(this.state.listBudgets)

        }

        catch (error) {

            console.log(error)

        }

    }


    GetIdBudget = async (id) => {

        try {

            await AsyncStorageLib.setItem('IdBudget', id)
            // await localStorage.setItem('IdBudget', id)

            console.log(id)

            this.props.navigation.navigate("BudgetDetail")

        }

        catch (error) {

            console.log(error)

        }

    }





    componentDidMount = () => {

        this.GetListBudgets()

    }



    render() {

        return (

            <View style={styles.container}>


                <Text style={styles.title}>Orçamentos</Text>


                <Pressable
                    style={styles.exitButton}
                    onPress={() => this.props.navigation.navigate('RegisterServiceType')}
                >
                    <Image
                        source={require('../../assets/images/back.png')}
                        style={styles.arrow}
                    />

                    <Text style={styles.exitText}>Voltar</Text>
                </Pressable>


                {/* <ScrollView> */}



                {/* LISTA */}

                <View style={styles.mainBody}>

                    <FlatList
                        contentContainerStyle={styles.mainBodyContent}
                        data={this.state.listBudgets}
                        keyExtractor={item => item.id}
                        renderItem={this.renderItem}
                    />

                </View>

                {/* FIM LISTA */}



                {/* </ScrollView> */}


            </View>


        )

    }


    renderItem = ({ item }) => (

        <View style={styles.flatItemRow}>

            <View style={styles.flatItemContainer}>

                {/* <Text style={styles.flatItemInfo}>Data Solicitação: {Intl.DateTimeFormat('pt-BR').format(new Date(item.creationDate))}</Text> */}
                <Text style={styles.flatItemInfo}>Veículo: {item.vehicle.modelName}</Text>
                <Text style={styles.flatItemInfo}>Ano: {item.vehicle.year}</Text>
                <Text style={styles.flatItemInfo}>Placa: {item.vehicle.licensePlate}</Text>
                <Text style={styles.flatItemInfo}>Valor Atual Orçamento: ${item.totalValue}</Text>

                <Pressable
                    style={styles.buttonList}
                    activeOpacity={0.5}
                    onPress={() => this.GetIdBudget(item.id)}
                >
                    <Text style={styles.listTextButton}>Ver Serviços</Text>
                </Pressable>

            </View>

        </View>

    )

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#f2f3f9"
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
        height: 280,
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
        paddingTop: 10,
        // backgroundColor: 'lightgray'
    }


})
