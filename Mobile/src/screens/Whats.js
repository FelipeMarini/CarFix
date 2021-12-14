import React, { Component } from 'react';
import { StyleSheet, Button, Linking, View, Text, Pressable, Image } from 'react-native';



export default class App extends Component {


  handleWhatsAppPress = async () => {

    await Linking.openURL("https://api.whatsapp.com/send?phone=5511977137983")

  }

  render() {

    return (

      <>

        <View style={styles.main}>

          <Text style={styles.text}>Fale com nossos funileiros e agende uma visita</Text>

          <View style={styles.whats}>

            <Button
              style={styles.button}
              color="#00E676"
              title="WhatsApp"
              onPress={() => this.handleWhatsAppPress()}
            />

          </View>

          <Pressable
            style={styles.exitButton}
            onPress={() => this.props.navigation.navigate('ServiceVehicle')}
          >
            <Image
              source={require('../../assets/images/back.png')}
              style={styles.arrow}
            />

            <Text style={styles.exitText}>Voltar</Text>
          </Pressable>

        </View>

      </>

    )

  }

}


const styles = StyleSheet.create({

  main: {
    marginTop: 120,
    alignItems: 'center'
  },

  whats: {
    width: '60%',
    height: 38,
    marginTop: 80,
    backgroundColor: 'white',
    borderColor: '#00E676',
    borderWidth: 2,
  },

  exitButton: {
    width: '50%',
    height: 50,
    flexDirection: 'row',
    marginLeft: '15%',
    marginTop: 75
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

  text: {
    fontFamily: 'Nunito700',
    fontSize: 22,
    fontWeight: "600",
    color: "#121212",
    textAlign: 'center',
    marginLeft: '15%',
    marginRight: '15%',
    marginTop: 12
  },

  button: {

  }


})