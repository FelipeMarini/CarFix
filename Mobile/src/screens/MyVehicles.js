import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable,TextInput, FlatList } from 'react-native'
import api from "../services/api"
import jwtDecode from 'jwt-decode'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import Modal from 'react-native-modal'



export default class MyVehicles extends Component {


  // conseguir atualizar a lista automaticamente quando cadastro um carro e volto para essa tela
  // fazer um alert de confirmação para excluir o veículo



  constructor(props) {

    super(props)

    this.state = {

      idUserLogged: '',
      idDeleteVehicle: '',
      idVehicleService: '',
      listVehicles: [],
      
      model: '',
      brand: '',
      plate: '',
      year: '',
      color: '',
      
      visible: false,
      statusPost: ''

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


  DeleteVehicle = (id) => {  //fazer alert aqui!

    try {

      const dataVehicles = this.state.listVehicles

      let filterArray = dataVehicles.filter((val, i) => {

        if (val.id !== id) {

          return val

        }

      })

      console.log('filterArray', filterArray)

      const answer = api.delete('/Vehicles/' + id)

      this.setState({ listVehicles: filterArray })

    }

    catch (error) {

      console.log(error)

    }

  }


  GetIdVehicleService = async (id) => {

    try {

      await AsyncStorageLib.setItem('IdVehicle', id)
      // await localStorage.setItem('IdVehicle', id)

      this.props.navigation.navigate("ServiceVehicle")

    }

    catch (error) {

      console.log(error)

    }

  }

  
  ShowModal = async () => {

    try {

      this.setState({visible: true})

    }

    catch (error) {

      console.log(error)

    }

  }


  RegisterVehicle = async () => {

    try {

        if (this.state.idUserLogged !== '' && this.state.model !== '' &&
            this.state.brand !== '' && this.state.year !== ''
            && this.state.color !== '' && this.state.plate !== '') {

            const answer = await api.post('/Vehicles', {
                licensePlate: this.state.plate,
                modelName: this.state.model,
                brandName: this.state.brand,
                year: this.state.year,
                color: this.state.color,
                idUser: this.state.idUserLogged
            })

            await this.setState({status: answer.status})

        }

        if (this.state.status == 201) {
          
          await alert('Veículo cadastrado com sucesso')

          const answer = await api.get('/Vehicles/User/' + this.state.idUserLogged)
          
          const list = answer.data

          this.setState({listVehicles: list})

          console.log(this.state.listVehicles)

          await this.setState({visible: false})

        }

        

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
          onPress={() => this.ShowModal()}
        >
          <Text style={styles.textButton}>Cadastrar Veículo</Text>
        </Pressable>


        <Modal
          isVisible={this.state.visible}
          style={styles.modal}>

          <View style={styles.modalView}>

          <Text style={styles.title1}>Adicionar Veículo</Text>

            <TextInput
                placeholder="Modelo"
                keyboardType="default"
                placeholderTextColor="rgba(0,0,0,1)"
                style={styles.input}
                onChangeText={model => this.setState({ model })}
            ></TextInput>

            <TextInput
                placeholder="Marca"
                placeholderTextColor="rgba(0,0,0,1)"
                style={styles.input}
                onChangeText={brand => this.setState({ brand })}
            ></TextInput>

            <TextInput
                placeholder="Ano"
                placeholderTextColor="rgba(0,0,0,1)"
                style={styles.input}
                onChangeText={year => this.setState({ year })}
            ></TextInput>

            <TextInput
                placeholder="Cor"
                placeholderTextColor="rgba(0,0,0,1)"
                style={styles.input}
                onChangeText={color => this.setState({ color })}
            ></TextInput>

            <TextInput
                placeholder="Placa"
                secureTextEntry={false}
                placeholderTextColor="rgba(0,0,0,1)"
                disableFullscreenUI={true}
                keyboardType="name-phone-pad"
                style={styles.input}
                onChangeText={plate => this.setState({ plate })}
            ></TextInput>

            <Pressable
                onPress={this.RegisterVehicle}
                style={styles.button}
            >
                <Text style={styles.textButton}>Salvar Veículo</Text>
            </Pressable>

            <Pressable
              style={styles.buttonClose}
              onPress={() => this.setState({ visible: false })}
            >
              <Text style={styles.textButtonClose}>Fechar</Text>
             </Pressable>

          </View>

        </Modal>


        {/* LISTA */}

        <View style={styles.mainBody}>

          <FlatList
            contentContainerStyle={styles.mainBodyContent}
            data={this.state.listVehicles}
            extraData={this.state.listVehicles}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
          />

        </View>

        {/* FIM LISTA */}



      </View>

    )


  }


  renderItem = ({ item }) => (

    <View style={styles.container}>

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
            onPress={() => this.DeleteVehicle(item.id)}
          >
            <Text style={styles.listTextButton}>Excluir Veículo</Text>
          </Pressable>

        </View>


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
    marginTop: 50,
    marginLeft: '5%',
    marginRight: '5%',
    textAlign: 'center'
  },

  subtitle: {
    fontFamily: 'Nunito700',
    fontSize: 18,
    fontWeight: "600",
    color: "#121212",
    textAlign: 'justify',
    marginLeft: '15%',
    marginRight: '15%',
    marginTop: 12
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
    marginBottom: 30
    // backgroundColor: 'lightpink'
  },

  flatItemContainer: {
    flex: 1,
    // backgroundColor: 'lightcyan'
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
  },



  // MODAL

  title1: {
    fontFamily: 'Nunito700',
    color: "rgba(40,47,102,1)",
    fontSize: 28,
    marginTop: 10,
    marginLeft: '5%',
    marginRight: '5%',
    textAlign: 'center'
  },

  subtitle1: {
    fontFamily: 'Nunito700',
    fontSize: 16,
    fontWeight: "600",
    color: "#121212",
    textAlign: 'justify',
    marginLeft: '15%',
    marginRight: '15%',
    marginTop: 12
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
    marginTop: 22
  },

  modal: {
    width: '80%',
    marginRight: '10%',
    marginLeft: '10%',
    // backgroundColor: 'lightgreen'
  },

  modalView: {
    width: '100%',
    height: '100%',
    borderWidth: 3,
    borderColor: '#282f66',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },

  buttonClose: {
    width: '50%',
    height: 35,
    backgroundColor: '#282f66',
    borderRadius: 5,
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },

  textButtonClose: {
    fontFamily: 'Nunito',
    fontSize: 20,
    fontWeight: "400",
    color: '#fff',
    marginBottom: '1%'
  },



})
