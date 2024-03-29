import React, { Component } from "react"
import { StyleSheet, View, Text, Pressable, Image, ActivityIndicator } from "react-native"
import api from '../services/api'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'


export default class Profile extends Component {



  constructor(props) {

    super(props)

    this.state = {

      idUserLogged: '',
      dataProfile: [],
      username: '',
      email: '',
      phoneNumber: '',
      isLoadingProfile: false

    }

  }


  GetMyProfile = async () => {

    try {

      const valueToken = await AsyncStorageLib.getItem('userToken')

      var idToken = jwtDecode(valueToken).jti

      this.setState({ idUserLogged: idToken })

      this.state.dataProfile = await api.get('/Users/' + this.state.idUserLogged)

      this.setState({

        username: this.state.dataProfile.data.username,
        email: this.state.dataProfile.data.email,
        phoneNumber: this.state.dataProfile.data.phoneNumber,

      })

    }

    catch (error) {

      console.log(error)

    }

  }


  Logout = async () => {

    try {

      await AsyncStorageLib.removeItem('userToken')

      this.props.navigation.navigate('Login')

      this.setState({ isLoadingProfile: false })

    }

    catch (error) {

      console.log(error)

    }

  }


  componentDidMount = (event) => {

    this.GetMyProfile()

    this.setState({ isLoadingProfile: false })

  }


  EditProfile = async () => {

    await this.setState({ isLoadingProfile: true })

    await this.props.navigation.navigate('EditProfile')

    await this.setState({ isLoadingProfile: false })

  }


  render() {


    return (


      <View style={styles.container}>


        <Text style={styles.title}>Meu Perfil</Text>

        <Text style={styles.text}><Text style={styles.item}>Nome:</Text> {this.state.username}</Text>

        <Text style={styles.text}><Text style={styles.item}>Email:</Text> {this.state.email}</Text>

        <Text style={styles.text}><Text style={styles.item}>Celular:</Text> {this.state.phoneNumber}</Text>


        <Pressable
          style={styles.button}
          onPress={() => this.EditProfile()}
        >
          <Text style={styles.textButton}>Alterar Informações</Text>
        </Pressable>


        <ActivityIndicator
          style={styles.spinner}
          size={'large'}
          color={'#282f66'}
          animating={this.state.isLoadingProfile}
        >
        </ActivityIndicator>


        <Pressable
          style={styles.exitButton}
          onPress={this.Logout}
        >

          <Image
            source={require('../../assets/images/back.png')}
            style={styles.arrow}
          />

          <Text style={styles.exitText}>Sair</Text>

        </Pressable>


      </View>

    )

  }

}


const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    backgroundColor: "rgba(242,243,249,1)"
  },

  title: {
    fontFamily: 'Nunito700',
    color: "rgba(40,47,102,1)",
    fontSize: 34,
    textAlign: 'center',
    marginTop: 100
  },

  text: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: "#282f66",
    fontWeight: "300",
    marginTop: 30
  },

  item: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: "#282f66",
    fontWeight: "600",
    marginTop: 20
  },

  exitButton: {
    width: '50%',
    height: 50,
    flexDirection: 'row',
    marginLeft: '20%',
    marginTop: 55
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
    marginTop: 40
  },

  textButton: {
    fontFamily: 'Nunito',
    fontSize: 20,
    fontWeight: "400",
    color: '#fff',
    marginBottom: '1%'
  },

  spinner: {

  }


})


