import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable, ScrollView, FlatList, Image } from 'react-native'
import api from '../services/api'
import AsyncStorageLib from "@react-native-async-storage/async-storage"


export default class BudgetDetail extends Component {

    // haverá opção de aprovar ou não o orçamento?
    // fazer uma lógica de aparecer mensagens:
    // se os status de todos os serviços estiverem "finalizados" -> "Os serviços deste orçamento foram concluídos"
    // se os status de todos os serviços estiverem "na fila" -> "Não aprovou o orçamento   recebido ou possui alguma dúvida? Fale conosco(link) ou agende uma visita(link)"
    // se houver algum status "em andamento" -> "Seus serviços estão sendo realizados. Dúvidas ou informações de seus serviços? Fale conosco(link) ou agende uma visita(link)"


    constructor(props) {

        super(props)

        this.state = {

            listServicesBudget: []

        }

    }



    GetServicesPerBudget = async () => {

        try {

            const idBudget = AsyncStorageLib.getItem('IdBudget')

            console.log(idBudget)

            const answer = await api.get('/Services/Budget/' + idBudget)

            console.log(answer.data)

            this.setState({ listServicesBudget: answer.data })

            console.log(this.state.listServicesBudget)

        }

        catch (error) {

            console.log(error)

        }

    }


    AnswerService = (id) => {

        try {

            this.setState(() => AsyncStorageLib.setItem('IdService', id))

            this.props.navigation.navigate("AnswerService")

        }

        catch (error) {

            console.log(error)

        }

    }



    componentDidMount = () => {

        this.GetServicesPerBudget()

    }




    render() {

        return (


            <View style={styles.container}>


                <Text style={styles.title}>Serviços do Orçamento</Text>


                <Pressable
                    style={styles.exitButton}
                    onPress={() => this.props.navigation.navigate('BudgetView')}
                >
                    <Image
                        source={require('../../assets/images/back.png')}
                        style={styles.arrow}
                    />

                    <Text style={styles.exitText}>Voltar</Text>
                </Pressable>



                <ScrollView>


                    {/* LISTA */}

                    <View style={styles.mainBody}>

                        <FlatList
                            contentContainerStyle={styles.mainBodyContent}
                            data={this.state.listServicesBudget}
                            keyExtractor={item => item.id}
                            renderItem={this.renderItem}
                        />

                    </View>

                    {/* FIM LISTA */}


                </ScrollView>


            </View>


        )

    }


    renderItem = ({ item }) => (

        <View style={styles.flatItemRow}>

            <View style={styles.flatItemContainer}>

                <Text style={styles.flatItemInfo}>Data Cadastro: {Intl.DateTimeFormat('pt-BR').format(new Date(item.creationDate))}</Text>
                <Text style={styles.flatItemInfo}>Descrição: {item.serviceDescription}</Text>
                <Text style={styles.flatItemInfo}>Tipo Serviço: {item.serviceType.typeName}</Text>
                <Text style={styles.flatItemInfo}>Valor Serviço: ${item.price}</Text>
                <Text style={styles.flatItemInfo}>Observações Funilaria: {item.observations}</Text>
                {/* <Text style={styles.flatItemInfo}>Status Serviço: {item.serviceStatus}</Text>
                <Text style={styles.flatItemInfo}>ID Funileiro: {item.worker.id}</Text> */}
                {/* <Text style={styles.flatItemInfo}>Valor Total Orçamento: {item.budget.totalValue}</Text> */}

                <Pressable
                    style={styles.buttonList}
                    activeOpacity={0.5}
                    onPress={() => this.AnswerService(item.id)}
                >
                    <Text style={styles.listTextButton}>Responder Serviço</Text>
                </Pressable>

            </View>

        </View>

    )

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#f2f3f9",
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
        height: 340,
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
        fontWeight: "600",
        color: '#000',
        lineHeight: 28,
        textAlign: 'justify',
        paddingTop: 14,
        // backgroundColor: 'lightgray'
    }


})
