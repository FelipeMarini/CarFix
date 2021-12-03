import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable, Image, ScrollView, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from "../services/api"
import jwtDecode from 'jwt-decode'


export default class MyVehicles extends Component {



  constructor(props) {

    super(props)

    this.state = {

      idUserLogged: '',
      idDeleteVehicle: '',
      idVehicleService: '',
      listVehicles: []

    }

  }


  GetListVehiclesByIdUser = async () => {

    try {

      const valueToken = await AsyncStorage.getItem('userToken')

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


  GetIdVehicleService = (id) => {

    try {

      console.log(id)

      this.setState(() => localStorage.setItem('IdVehicleService', id))

      this.props.navigation.navigate("ServiceVehicle")

    }

    catch (error) {

      console.log(error)

    }

  }

  GetIdVehicleEdit = (id) => {

    try {

      console.log(id)

      this.setState(() => localStorage.setItem('IdVehicleService', id))

      this.props.navigation.navigate("EditVehicle")

    }

    catch (error) {

      console.log(error)

    }

  }


  GetIdVehicleRequest = (id) => {

    try {

      console.log(id)

      this.setState(() => localStorage.setItem('IdVehicleService', id))

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

    this.GetListVehiclesByIdUser()

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


        <ScrollView>


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


        </ScrollView>


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
    fontFamily: "nunito-700.ttf",
    color: "rgba(40,47,102,1)",
    fontSize: 34,
    marginTop: 15,
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
    fontFamily: 'nunito-regular.ttf',
    fontSize: 20,
    fontWeight: 400,
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
    fontFamily: 'nunito-regular.ttf',
    fontSize: 18,
    fontWeight: 400,
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
    // backgroundColor: 'lightpink'
  },

  flatItemContainer: {
    flex: 1,
    // backgroundColor: 'purple'
  },

  flatItemTitle: {
    fontFamily: 'roboto-regular.ttf',
    fontSize: 20,
    fontWeight: 600,
    color: '#282f66',
    marginTop: 10,
    // backgroundColor: 'lightyellow'
  },

  flatItemInfo: {
    fontFamily: 'roboto-regular.ttf',
    fontSize: 16,
    fontWeight: 550,
    color: '#000',
    lineHeight: 25,
    textAlign: 'justify',
    paddingTop: 5,
    // backgroundColor: 'lightgray'
  }


})
