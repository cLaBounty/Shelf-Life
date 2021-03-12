import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';

export default function AddItemScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>

      {/* Temporary */}
      <Text style={styles.text}>Add Item Screen</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Scan Item')}>
        <Text style={styles.btnText}>Scan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Item Information', { itemName: "", itemQuantity: "", itemUnitPrice: "", itemExpDate: "" })}>
        <Text style={styles.btnText}>Manual</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    opacity: 0.50
  },
  text: {
    fontSize: 24,
    color: '#fff',
    margin: 10
  },
  btn: {
    backgroundColor:'#595959',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5
  },
  btnText: {
    fontSize: 14,
    color:'#fff',
    padding: 8,
    letterSpacing: 1.5
  }
});