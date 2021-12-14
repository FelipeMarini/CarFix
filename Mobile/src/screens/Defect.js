import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable, Image } from 'react-native'
import api from "../services/api"
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import axios from 'axios'


export default class Defect extends Component {



    constructor(props) {

        super(props)

        this.state = {

            path: '',
            result: ''

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

                    // console.log(response.data)

                    // console.log(response.data.output_url)

                    this.setState({ result: response.data.output_url })

                    console.log(this.state.result)

                })



        }

        catch (error) {

            console.log(error)

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


                <Image
                    style={styles.img}
                    source={this.state.result ? { uri: this.state.result } : null}
                />


            </View>


        )

    }


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
        marginTop: 60,
        marginLeft: '5%',
        marginRight: '5%',
        textAlign: 'center'
    },

    exitButton: {
        width: '50%',
        height: 50,
        flexDirection: 'row',
        marginLeft: '20%',
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
        width: '85%',
        height: 370,
        marginTop: 20
    }


})