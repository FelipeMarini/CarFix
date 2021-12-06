import React, { Component } from "react"
import { StyleSheet, View, Text, Pressable, Image } from "react-native"


export default class AddVehicleMenu extends Component {


    render() {

        return (

            <View style={styles.container}>

                <Text style={styles.title}>Adicionar Veículo</Text>

                <Text style={styles.subtitle}>
                    Escaneie a placa do seu veículo para cadastro automático
                </Text>


                <Pressable
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate("Scan")}
                >
                    <Text style={styles.textButton}>Escanear Placa</Text>
                </Pressable>


                <Pressable
                    onPress={() => this.props.navigation.navigate("AddVehicleManual")}
                    style={styles.button}
                >
                    <Text style={styles.textButton}>Adicionar sem Scan</Text>
                </Pressable>


                <Pressable
                    style={styles.exitButton}
                    onPress={() => this.props.navigation.navigate('Meus Veículos')}
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
        backgroundColor: "rgba(242,243,249,1)"
    },

    title: {
        fontFamily: 'Nunito700',
        color: "rgba(40,47,102,1)",
        fontSize: 34,
        marginTop: 25,
        marginLeft: '5%',
        marginRight: '5%',
        textAlign: 'center',
        marginTop: 60
    },

    subtitle: {
        fontFamily: 'Nunito700',
        fontWeight: "600",
        color: "#121212",
        fontSize: 15,
        textAlign: 'justify',
        marginLeft: '15%',
        marginRight: '15%',
        marginTop: 50
    },

    exitButton: {
        width: '50%',
        height: 50,
        flexDirection: 'row',
        marginLeft: '20%',
        marginTop: 50
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
        marginTop: 60
    },

    textButton: {
        fontFamily: 'Nunito',
        fontSize: 20,
        fontWeight: "400",
        color: '#fff',
        marginBottom: '1%'
    }


})


