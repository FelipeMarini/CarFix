import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Profile from './Profile'
import MyVehicles from './MyVehicles'



const bottomTab = createBottomTabNavigator()


export default class Main extends Component {  // alinhar 3 ícones do bottom tab??

  // pegar o ícone de budget no mesmo molde dos outros (branco)

  // fazer lógica para não misturar os budgets

  render() {

    return (

      <View style={styles.main}>

        <bottomTab.Navigator

          style={styles.containerIcons}

          initialRouteName='Meus Veículos'

          tabBarOptions={{
            showLabel: true,
            showIcon: true,
            activeBackgroundColor: '#282f66',
            inactiveBackgroundColor: '#282f66',
            activeTintColor: '#fff',
            inactiveTintColor: '#fff',
            style: {
              height: 60
            }
          }}

          screenOptions={({ route }) => ({

            headerShown: false,

            tabBarIcon: () => {

              if (route.name === 'Meu Perfil') {
                return (
                  <Image
                    source={require('../../assets/images/user_icon.png')}
                    style={styles.iconUser}
                  />
                )
              }

              if (route.name === 'Meus Veículos') {
                return (
                  <Image
                    source={require('../../assets/images/car_icon.png')}
                    style={styles.iconVehicle}
                  />
                )
              }

            }

          })}
        >

          <bottomTab.Screen name='Meus Veículos' component={MyVehicles} />
          <bottomTab.Screen name='Meu Perfil' component={Profile} />

        </bottomTab.Navigator>

      </View>

    )

  }

}


const styles = StyleSheet.create({

  main: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },

  containerIcons: {
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain'
  },

  iconUser: {
    width: 24,
    height: 24,
    color: '#fff'
  },

  iconVehicle: {
    width: 45,
    height: 45,
    marginTop: 5
  }


})