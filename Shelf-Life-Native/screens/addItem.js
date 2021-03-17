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
          <Text style={styles.btnText}>Scan</Text>
          <Image style={styles.btnImage} source={require('../assets/placeholder.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Item Information', { itemName: "", itemQuantity: "", itemUnitPrice: "", itemExpDate: "" })}>
          <Text style={styles.btnText}>Manual</Text>
          <Image style={styles.btnImage} source={require('../assets/placeholder.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}