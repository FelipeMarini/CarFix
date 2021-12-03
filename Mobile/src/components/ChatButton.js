import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'


export default function ChatButton({ focused, size }) {

    
    return (

        <View style={[styles.button, { backgroundColor: focused ? '#FF0000' : 'gray' }]}>
            <FontAwesome5 name="robot" size={size} color={focused ? '#FFF' : '#FFF'} />
        </View>
    )

}


const styles = StyleSheet.create({

    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    }

})