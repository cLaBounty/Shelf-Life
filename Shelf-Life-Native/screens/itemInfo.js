import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../Style';

export default function ItemInfoScreen({ params }) {
  const [name, setName] = useState(params.itemName);
  const [quantity, setQuantity] = useState(params.itemQuantity);
  const [price, setPrice] = useState(params.itemUnitPrice);
  const [expDate, setExpDate] = useState(params.itemExpDate);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>
      <TextInput
        style={styles.inputField}
        placeholder="Item Name"
        placeholderTextColor="#9E9791"
        defaultValue={route.params.itemName}
        onChangeText={(value) => setName(value)}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Quantity"
        placeholderTextColor="#9E9791"
        keyboardType="numeric"
        defaultValue={route.params.itemQuantity}
        onChangeText={(value) => setQuantity(value)}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Unit Price"
        placeholderTextColor="#9E9791"
        keyboardType="numeric"
		    defaultValue={route.params.itemUnitPrice}
        onChangeText={(value) => setPrice(value)}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Expiration Date"
        placeholderTextColor="#9E9791"
        keyboardType="numbers-and-punctuation"
		    defaultValue={route.params.itemExpDate}
        onChangeText={(value) => setExpDate(value)}
      />
      <TouchableOpacity style={itemInfoStyles.submitBtn} onPress={() => handleSubmit(name, quantity, price, expDate, navigation)}>
        <Text style={itemInfoStyles.submitBtnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const handleSubmit = (name, quantity, price, expDate, navigation) => {
  // TODO: Add item to pantry
  navigation.navigate('Home');
}

const itemInfoStyles = StyleSheet.create({
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
	}
});