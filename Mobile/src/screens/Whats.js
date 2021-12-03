import React from 'react';
import { StyleSheet, Button, Linking, View, } from 'react-native';

export default function App() {

  const handleWhatsAppPress = () => {
    Linking.openURL("https://api.whatsapp.com/send?phone=5511977137983&text=Seja%20Bem-vindo%20CarFix%22%22");
  }

  return (
    <>
    <View style={styles.main}> 


    <View style={styles.whats}> 
    <Button color="#00E676" title="WhatsApp" onPress={handleWhatsAppPress} />
    </View>
    </View>
    </>
  );
};


const styles = StyleSheet.create({
  
  main: {
    marginTop: '100%',
  },
  
  whats: {
    width:  '60%',
    height: '30%',
    marginTop: '4%',
    marginLeft: '20%',
    backgroundColor: 'white',
    borderColor: '#00E676',
    borderWidth: 2,
  }

})