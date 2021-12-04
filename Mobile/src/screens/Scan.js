import React, { Component } from 'react'
import { StyleSheet, View, Text, Pressable, ImageBackground, Image } from 'react-native'


export default class Scan extends Component {   // terminar

    // aprender "modal" e "refresh screen"

    render() {

        return (

            <View style={styles.container}>

                <ImageBackground
                    source={require('../../assets/images/car_scan.png')}
                    style={styles.img}
                >

                    <Text style={styles.text}>
                        Centralize a câmera de seu celular na placa de seu veículo e tire uma foto para o cadastro automático
                    </Text>

                    <Pressable
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Camera')}
                    >
                        <Text style={styles.textButton}>
                            Câmera
                        </Text>
                    </Pressable>

                    <Pressable
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('AddVehicleManual')}
                    >
                        <Text style={styles.textButton}>
                            Adicionar sem Scan
                        </Text>
                    </Pressable>

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


                </ImageBackground>


            </View>

        )

    }

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    img: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: 'center'
    },

    text: {
        fontFamily: 'nunito-700.ttf',
        fontSize: 20,
        color: '#fff',
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: 70,
        textAlign: 'justify',
        lineHeight: 30
    },

    exitButton: {
        width: '50%',
        height: 50,
        flexDirection: 'row',
        marginLeft: '20%',
        marginTop: 60
    },

    arrow: {
        width: '22%',
        height: 65,
        tintColor: '#fff'
    },

    exitText: {
        fontFamily: 'nunito-700.ttf',
        fontSize: 20,
        color: '#fff',
        marginTop: 16
    },

    button: {
        width: '60%',
        height: 40,
        backgroundColor: '#282f66',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 75
    },

    textButton: {
        fontFamily: 'nunito-regular.ttf',
        fontSize: 20,
        fontWeight: "400",
        color: '#fff',
        marginBottom: '1%'
    }



})