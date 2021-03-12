import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../Style';

export default function ItemInfoScreen({ navigation, route }) {
  const [name, setName] = useState(route.params.itemName);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [expDate, setExpDate] = useState("");

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>
      <TextInput
        style={infoStyles.inputField}
        placeholder="Item Name"
        placeholderTextColor="#9E9791"
        defaultValue={route.params.itemName}
        onChangeText={(value) => setName(value)}
      />
      <TextInput
        style={infoStyles.inputField}
        placeholder="Quantity"
        placeholderTextColor="#9E9791"
        keyboardType="numeric"
        onChangeText={(value) => setQuantity(value)}
      />
      <TextInput
        style={infoStyles.inputField}
        placeholder="Unit Price"
        placeholderTextColor="#9E9791"
        keyboardType="numeric"
        onChangeText={(value) => setPrice(value)}
      />
      <TextInput
        style={infoStyles.inputField}
        placeholder="Expiration Date"
        placeholderTextColor="#9E9791"
        keyboardType="numbers-and-punctuation"
        onChangeText={(value) => setExpDate(value)}
      />
      <TouchableOpacity style={infoStyles.submitBtn} onPress={() => handleSubmit(name, quantity, price, expDate, navigation)}>
        <Text style={infoStyles.submitBtnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const handleSubmit = (name, quantity, price, expDate, navigation) => {
  // TODO: Add item to pantry
  navigation.navigate('Home');
}

const infoStyles = StyleSheet.create({
  inputField: {
    width: 300,
    fontSize: 22,
    color: '#fff',
    margin: 20,
    padding: 3,
    paddingLeft: 0,
    borderColor: '#fff',
    borderBottomWidth: 1
  },
  submitBtn: {
    backgroundColor:'#5296E7',
    borderColor: '#fff',
    borderWidth: 0,
    borderRadius: 10
  },
  submitBtnText: {
    fontSize: 16,
    color:'#fff',
    padding: 8,
    letterSpacing: 2
  },
});