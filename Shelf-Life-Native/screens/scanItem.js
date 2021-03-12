import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Cam from '../components/barcodeScanner';

export default function ScanItemScreen({ navigation }) {
  // TODO: Merge Cam class with this, could maybe done through props?
  
  return (<Cam/>);
  
  return (  
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>Scan Item Screen</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Item Information', { itemName: "", itemQuantity: "", itemUnitPrice: "", itemExpDate: "" })}>
        <Text style={styles.btnText}>Take Picture</Text>
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