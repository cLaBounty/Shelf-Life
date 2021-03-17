import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import styles from '../Style';

export default function AddItemScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>

      {/* Temporary */}
      <Text style={styles.text}>Add Item Screen</Text>
      <View style={styles.menucontainer}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Scan Item')}>
          <Image style={styles.btnImage} source={require('../assets/scan.png')}/>
          <Text style={styles.btnText}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Item Information', { itemName: "", itemQuantity: "", itemUnitPrice: "", itemExpDate: "" })}>
          <Image style={styles.btnImage} source={require('../assets/manual.png')}/>
          <Text style={styles.btnText}>Manual</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}