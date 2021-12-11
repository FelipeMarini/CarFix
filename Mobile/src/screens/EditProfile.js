import React, { Component } from "react"
import { StyleSheet, View, Text, TextInput, Pressable, Image } from "react-native"
import api from '../services/api'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'


export default class EditProfile extends Component {

  // fazer lógica de confirmar senha

  constructor(props) {

    super(props)

    this.state = {

      idUserLogged: '',
      newCreationDate: '',
      newUserName: '',
      newEmail: '',
      newPassword: '',
      newUserType: 2,
      newPhoneNumber: '',
      msgConfirmacao: ''

    }

  }


  GetIdUserLogged = async () => {

    try {

      const valueToken = await AsyncStorageLib.getItem('userToken')

      var idToken = jwtDecode(valueToken).jti

      this.setState({ idUserLogged: idToken })

      this.state.dataProfile = await api.get('/Users/' + this.state.idUserLogged)

      this.setState({
        idUserLogged: this.state.dataProfile.data.id,
        newCreationDate: this.state.dataProfile.data.creationDate
      })

      console.log(this.state.idUserLogged, this.state.newCreationDate)

    }

    catch (error) {

      console.log(error)

    }

  }



  AlterProfile = async () => {

    try {

      if (this.state.idUserLogged !== '' && this.state.newCreationDate !== '' &&
        this.state.newUserName !== '' && this.state.newEmail !== ''
        && this.state.newPassword !== '' && this.state.newPhoneNumber !== '') {

        const answer = await api.patch('/Users', {
          userId: this.state.idUserLogged,
          creationDate: this.state.newCreationDate,
          username: this.state.newUserName,
          email: this.state.newEmail,
          userType: this.state.newUserType,
          password: this.state.newPassword,
          phoneNumber: this.state.newPhoneNumber
        })

        this.setState({ msgConfirmacao: 'Informações alteradas com sucesso' })

      }

    }

    catch (error) {

      console.log(error)

    }

  }



  componentDidMount = () => {

    this.GetIdUserLogged()

  }




  render() {

    return (

      <View style={styles.container}>

        <Text style={styles.title}>Editar Perfil</Text>

        <Text style={styles.subtitle}>Edite suas Informações Pessoais</Text>

        <TextInput
          placeholder="Nome"
          keyboardType="default"
          style={styles.input}
          onChangeText={newUserName => this.setState({ newUserName })}
        ></TextInput>

        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
          onChangeText={newEmail => this.setState({ newEmail })}
        ></TextInput>

        <TextInput
          placeholder="Telefone"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={newPhoneNumber => this.setState({ newPhoneNumber })}
        ></TextInput>

        <TextInput
          placeholder="Nova Senha"
          secureTextEntry={true}
          disableFullscreenUI={true}
          style={styles.input}
          onChangeText={newPassword => this.setState({ newPassword })}
        ></TextInput>

        {/* <TextInput
          placeholder="Confirme a Nova Senha"
          secureTextEntry={true}
          disableFullscreenUI={true}
          style={styles.input}
        ></TextInput> */}


        <Pressable
          onPress={this.AlterProfile}
          style={styles.button}
        >
          <Text style={styles.textButton}>Alterar Perfil</Text>
        </Pressable>


        <Text style={styles.msgSucesso}>{this.state.msgConfirmacao}</Text>


        <Pressable
          style={styles.exitButton}
          onPress={() => this.props.navigation.navigate('Meu Perfil')}
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
    textAlign: 'center'
  },

  subtitle: {
    fontFamily: 'Nunito700',
    fontWeight: "600",
    color: "#121212",
    fontSize: 20,
    textAlign: 'center',
    marginTop: 38
  },

  input: {
    width: '80%',
    height: 50,
    fontFamily: 'Nunito',
    color: "#121212",
    borderWidth: 2,
    borderColor: "rgba(40,47,102,1)",
    backgroundColor: "#F5F7F9",
    borderRadius: 5,
    borderStyle: "solid",
    paddingLeft: 20,
    marginTop: 25
  },

  exitButton: {
    width: '50%',
    height: 50,
    flexDirection: 'row',
    marginLeft: '20%',
    marginTop: 8
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
    width: '50%',
    height: 40,
    backgroundColor: '#282f66',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#f1f1f1',
    marginTop: 35
  },

  textButton: {
    fontFamily: 'Nunito',
    fontSize: 22,
    fontWeight: "400",
    color: '#fff',
    marginBottom: '1%'
  },

  msgSucesso: {
    marginTop: '5%'
  }


})


