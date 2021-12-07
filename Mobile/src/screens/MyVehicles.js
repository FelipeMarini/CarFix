import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable, Image, ScrollView, FlatList } from 'react-native'
import api from "../services/api"
import jwtDecode from 'jwt-decode'
import AsyncStorageLib from '@react-native-async-storage/async-storage'


export default class MyVehicles extends Component {


  // conseguir atualizar a lista automaticamente quando cadastro um carro e volto para essa tela



  constructor(props) {

    super(props)

    this.state = {

      idUserLogged: '',
      idDeleteVehicle: '',
      idVehicleService: '',
      listVehicles: []

    }

  }


  GetVehiclesUser = async () => {

    try {

      const valueToken = await AsyncStorageLib.getItem('userToken')

      var idToken = jwtDecode(valueToken).jti

      this.setState({ idUserLogged: idToken })

      const answer = await api.get('/Vehicles/User/' + this.state.idUserLogged)

      const dataVehicles = answer.data

      this.setState({ listVehicles: dataVehicles })

    }

    catch (error) {

      console.log(error)

    }

  }


  GetIdVehicleService = async (id) => {

    try {

      // await AsyncStorageLib.setItem('IdVehicle', id)
      await localStorage.setItem('IdVehicle', id)

      this.props.navigation.navigate("ServiceVehicle")

    }

    catch (error) {

      console.log(error)

    }

  }

  GetIdVehicleEdit = async (id) => {

    try {

      // console.log(id)

      // await AsyncStorageLib.setItem('IdVehicle', id)
      await localStorage.setItem('IdVehicle', id)

      this.props.navigation.navigate("EditVehicle")

    }

    catch (error) {

      console.log(error)

    }

  }


  GetIdVehicleRequest = async (id) => {

    try {

      // console.log(id)

      // await AsyncStorageLib.setItem('IdVehicle', id)
      await localStorage.setItem('IdVehicle', id)

      this.props.navigation.navigate("RegisterService")

    }

    catch (error) {

      console.log(error)

    }

  }


  Logout = async () => {

    try {

      await AsyncStorage.removeItem('userToken')

      this.props.navigation.navigate('Login')

    }

    catch (error) {

      console.log(error)

    }

  }


  componentDidMount = () => {

    this.GetVehiclesUser()

  }



  render() {


    return (


      <View style={styles.container}>


        <Text style={styles.title}>Meus Veículos</Text>

        <Pressable
          style={styles.button}
          onPress={() => this.props.navigation.navigate("AddVehicleMenu")}
        >
          <Text style={styles.textButton}>Cadastrar Veículo</Text>
        </Pressable>


        {/* <ScrollView>' */}


        {/* LISTA */}

        <View style={styles.mainBody}>

          <FlatList
            contentContainerStyle={styles.mainBodyContent}
            data={this.state.listVehicles}
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

        <Text style={styles.flatItemTitle}>Modelo: {item.modelName}</Text>
        <Text style={styles.flatItemInfo}>Marca: {item.brandName}</Text>
        <Text style={styles.flatItemInfo}>Ano: {item.year}</Text>
        <Text style={styles.flatItemInfo}>Cor: {item.color}</Text>
        <Text style={styles.flatItemInfo}>Placa: {item.licensePlate}</Text>


        <Pressable
          style={styles.buttonList}
          activeOpacity={0.5}
          onPress={() => this.GetIdVehicleService(item.id)}
        >
          <Text style={styles.listTextButton}>Ver Orçamento</Text>
        </Pressable>


        <Pressable
          style={styles.buttonList}
          activeOpacity={0.5}
          onPress={() => this.GetIdVehicleEdit(item.id)}
        >
          <Text style={styles.listTextButton}>Editar Veículo</Text>
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
    marginTop: 55,
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
    marginTop: 25
  },

  listTextButton: {
    fontFamily: 'Nunito',
    fontSize: 18,
    fontWeight: "400",
    color: '#fff',
    marginBottom: '1%'
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
    height: 300,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#282f66',
    marginTop: 18,
    backgroundColor: 'lightpink'
  },

  flatItemContainer: {
    flex: 1,
    backgroundColor: 'lightcyan'
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
    lineHeight: 25,
    textAlign: 'justify',
    paddingTop: 5,
    // backgroundColor: 'lightgray'
  }


})
