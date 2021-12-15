import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable, Image, ScrollView } from 'react-native'
import api from "../services/api"
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import axios from 'axios'


export default class Defect extends Component {



    constructor(props) {   //traduzir os dados para português

        super(props)

        this.state = {

            path: '',
            result: '',
            elements: []

        }

    }


    AnalyzeImage = async () => {

        try {

            const options = {

                method: 'POST',

                url: 'https://vehicle-damage-assessment.p.rapidapi.com/run',

                headers: {
                    'content-type': 'application/json',
                    'x-rapidapi-host': 'vehicle-damage-assessment.p.rapidapi.com',
                    'x-rapidapi-key': 'c6e5e91e50msh9f93fc1598f3d6dp1846e1jsn2e413432091b'
                },

                data: {
                    draw_result: true,
                    image: 'https://54.147.100.207/Images/' + this.state.path
                }

            }


            axios.request(options)

                .then((response) => {

                    this.setState({ result: response.data.output_url })
                    this.setState({ elements: response.data.output.elements })

                    console.log(this.state.result)
                    console.log(response.data.output.elements)


                })

        }

        catch (error) {

            console.log(error)

        }

    }

    ChangeInnerHTMLDamage = (item) => {
        switch (item.damage_category) {
            case 'slight_scratch':
                return 'Arranhão leve';

            case 'windshield_damage':
                return 'Dano no parabrisa';

            case 'severe_deformation':
                return 'Deformação grave';

            case 'crack_and_hole':
                return 'Arranhão e furo';

            case 'severe_scratch':
                return 'Arranhão forte';

            case 'medium_deformation':
                return 'Deformação média';

            case 'fender/bumper_damage':
                return 'Dano no parachoque';

            case 'car_light_damage':
                return 'Danos leves';

            case 'side_mirror_drop_off':
                return 'Retrovisor danificado';

            default:
                break;
        }
    }

    ChangeInnerHTMLLocal = (item) => {
        switch (item.damage_location) {
            case 'front_windshield':
                return 'Parabrisa frontal';

            case 'right_front_door':
                return 'Porta direita frontal'

            case 'right_rear_door':
                return 'Porta direita traseira'

            case 'right_doorsill':
                return 'Soleira da porta direita'

            case 'right_rear_wing':
                return 'Asa direita do carro'

            case 'left_front_door':
                return 'Porta esquerda frontal'

            case 'left_rear_door':
                return 'Porta esquerda traseira'

            case 'left_doorsill':
                return 'Soleira da porta esquerda'

            case 'left_rear_wing':
                return 'Asa esquerda do carro'

            case 'rear_bumper':
                return 'Parachoque traseiro'

            case 'decklid':
                return 'Tampa de convés'

            case 'left_tail_light':
                return 'Farol traseiro esquerdo'

            case 'right_tail_light':
                return 'Farol traseiro direito'

            case 'front_bumper':
                return 'Parachoque frontal'

            case 'tire':
                return 'Roda'

            case 'left_tail_light':
                return 'Farol traseiro esquerdo'

            case 'left_front_wing':
                return 'Asa frontal esquerda'

            case 'right_front_wing':
                return 'Asa frontal direita'

            case 'left_front_tire':
                return 'Roda frontal esquerda'

            case 'right_front_tire':
                return 'Roda frontal direita'

            case 'right_light':
                return 'Farol direito'

            case 'left_light':
                return 'Farol esquerdo'

            default:
                return 'Não aplicável'
        }
    }

    componentDidMount = async () => {

        const IdImage = await AsyncStorageLib.getItem('IdImage')

        console.log(IdImage)

        const answer = await api.get('/ServiceImages/' + IdImage)

        console.log(answer.data)

        this.setState({ path: answer.data.imagePath })

        console.log(this.state.path)

    }



    render() {

        return (


            <View style={styles.container}>


                <Text style={styles.title}>Análise da Imagem</Text>


                <Pressable
                    style={styles.exitButton}
                    onPress={() => this.props.navigation.navigate('EditServiceImage')}
                >
                    <Image
                        source={require('../../assets/images/back.png')}
                        style={styles.arrow}
                    />

                    <Text style={styles.exitText}>Voltar</Text>
                </Pressable>


                <Pressable
                    style={styles.button}
                    onPress={() => this.AnalyzeImage()}
                >


                    <Text style={styles.textButton}>Analisar Imagem</Text>
                </Pressable>


                <ScrollView>

                    <Image
                        style={styles.img}
                        source={this.state.result ? { uri: this.state.result } : null}
                    />


                    {/* // fazer modal aqui */}

                    {
                        this.state.elements.map((item, index) => {

                            return (

                                <View
                                    style={styles.dataBox}
                                    key={index}
                                >

                                    <Text style={styles.text}>Categoria: {this.ChangeInnerHTMLDamage(item)}</Text>
                                    <Text style={styles.text}>Local: {this.ChangeInnerHTMLLocal(item)}</Text>


                                </View>

                            )

                        })
                    }


                </ScrollView>


            </View>


        )

    }

}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#f2f3f9",
        // alignItems: 'center'
    },

    title: {
        fontFamily: 'Nunito700',
        color: "rgba(40,47,102,1)",
        fontSize: 34,
        marginTop: 60,
        marginLeft: '5%',
        marginRight: '5%',
        textAlign: 'center'
    },

    exitButton: {
        width: '50%',
        height: 50,
        flexDirection: 'row',
        marginLeft: '35%',
        marginTop: 25
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
        marginLeft: '20%',
        marginRight: '20%',
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

    img: {
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
        height: 370,
        marginTop: 20
    },

    dataBox: {
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
        height: 120,
        borderWidth: 2,
        borderColor: '#282f66',
        borderRadius: 10,
        marginTop: 25,
        marginBottom: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        fontFamily: 'Nunito700',
        color: "rgba(40,47,102,1)",
        fontSize: 18,
        marginTop: 14
    },



})
