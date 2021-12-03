import React, { Component } from "react"
import { StyleSheet, View, Text, TextInput, Pressable, Image } from "react-native"



export default class RecoverPassword extends Component {


  render() {

    return (

      <View style={styles.container}>

        <Text style={styles.title}>Recuperar Senha</Text>

        <Text style={styles.subtitle}>
          Esqueceu sua senha? Insira seu email abaixo para recuperar suas
          credenciais
        </Text>

        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="rgba(0,0,0,1)"
          style={styles.input}
        ></TextInput>

        <Pressable
          onPress={() => props.navigation.navigate("Main")}
          style={styles.button}
        >
          <Text style={styles.textButton}>Recuperar Senha</Text>
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


      </View>

    )

  }

}

const styles = StyleSheet.create({

  container: {
    alignItems: 'center'
  },

  title: {
    fontFamily: "nunito-700.ttf",
    color: "rgba(40,47,102,1)",
    fontSize: 34,
    marginTop: 50
  },

  subtitle: {
    fontFamily: "nunito-700.ttf",
    color: "#121212",
    fontSize: 15,
    marginTop: 35,
    marginLeft: '5%',
    marginRight: '5%',
    textAlign: 'center'
  },

  input: {
    width: '80%',
    height: 50,
    fontFamily: "nunito-regular.ttf",
    color: "#121212",
    borderWidth: 2,
    borderColor: "rgba(40,47,102,1)",
    backgroundColor: "#F5F7F9",
    borderRadius: 5,
    borderStyle: "solid",
    paddingLeft: 20,
    marginTop: 50
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
    marginTop: 65
  },

  textButton: {
    fontFamily: 'nunito-regular.ttf',
    fontSize: 22,
    fontWeight: 400,
    color: '#fff',
    marginBottom: '1%'
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
    height: 65
  },

  exitText: {
    fontFamily: 'nunito-700.ttf',
    fontSize: 20,
    color: '#000',
    marginTop: 16
  }


})


