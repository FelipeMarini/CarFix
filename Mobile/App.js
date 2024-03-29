import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Fonts from 'expo-font'

import Login from './src/screens/Login'
import RecoverPassword from './src/screens/RecoverPassword'
import CreateAccount from './src/screens/CreateAccount'
import Main from './src/screens/Main'
import EditProfile from './src/screens/EditProfile'
import EditServiceImage from './src/screens/EditServiceImage'
import AddVehicleMenu from './src/screens/AddVehicleMenu'
import AddVehicleManual from './src/screens/AddVehicleManual'
import Scan from './src/screens/Scan'
import PlateScan from './src/screens/PlateScan'
import ServiceVehicle from './src/screens/ServiceVehicle'
import RegisterServiceType from './src/screens/RegisterServiceType'
import RegisterService from './src/screens/RegisterService'
import BudgetView from './src/screens/BudgetView'
import BudgetDetail from './src/screens/BudgetDetail'
import HomeWorker from './src/screens/HomeWorker'
import AnswerService from './src/screens/AnswerService'
import ViewImageAdm from './src/screens/ViewImageAdm'
import ViewImageAdm2 from './src/screens/ViewImageAdm2'
import Whats from './src/screens/Whats'
import Camera from './src/screens/Camera'
import CameraX from './src/screens/CameraX'
import Defect from './src/screens/Defect'

//verificar uniformidade das telas (fonte,botão)
// fazer link do chatbot
// fazer componente uniforme de "sair" e "voltar" para manter o padrão
// tentar amarrar um dado veículo em apenas um idBudget (apenas um orçamento por veículo)
// fazer validação de inputs de acordo com o dado


const AuthStack = createStackNavigator()



export default class Stack extends Component {



    GetFonts = () => Fonts.loadAsync({

        'Nunito700': require('./assets/fonts/nunito-700.ttf'),
        'Nunito': require('./assets/fonts/nunito-regular.ttf'),
        'Roboto': require('./assets/fonts/roboto-regular.ttf')

    })



    componentDidMount = () => {

        this.GetFonts()

    }


    render() {

        return (

            <NavigationContainer>

                <AuthStack.Navigator>

                    <AuthStack.Screen
                        name='Login'
                        component={Login}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='RecoverPassword'
                        component={RecoverPassword}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='CreateAccount'
                        component={CreateAccount}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='Main'
                        component={Main}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='EditProfile'
                        component={EditProfile}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='AddVehicleMenu'
                        component={AddVehicleMenu}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='AddVehicleManual'
                        component={AddVehicleManual}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='Scan'
                        component={Scan}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='ServiceVehicle'
                        component={ServiceVehicle}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='RegisterService'
                        component={RegisterService}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='BudgetView'
                        component={BudgetView}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='BudgetDetail'
                        component={BudgetDetail}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='HomeWorker'
                        component={HomeWorker}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='AnswerService'
                        component={AnswerService}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='Whats'
                        component={Whats}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='Camera'
                        component={Camera}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='CameraX'
                        component={CameraX}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='RegisterServiceType'
                        component={RegisterServiceType}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='EditServiceImage'
                        component={EditServiceImage}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='ViewImageAdm'
                        component={ViewImageAdm}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='ViewImageAdm2'
                        component={ViewImageAdm2}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='Defect'
                        component={Defect}
                        options={{ headerShown: false }}
                    />

                    <AuthStack.Screen
                        name='PlateScan'
                        component={PlateScan}
                        options={{ headerShown: false }}
                    />

                </AuthStack.Navigator>

            </NavigationContainer>

        )

    }

}


