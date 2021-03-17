import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../Style';
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