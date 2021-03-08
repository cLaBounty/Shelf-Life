import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';

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
        onChangeText={(value) => setQuantity(value)}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Unit Price"
        placeholderTextColor="#9E9791"
        keyboardType="numeric"
        onChangeText={(value) => setPrice(value)}
      />
      <TextInput
        style={styles.inputField}
        placeholder="Expiration Date"
        placeholderTextColor="#9E9791"
        keyboardType="numbers-and-punctuation"
        onChangeText={(value) => setExpDate(value)}
      />
      <TouchableOpacity style={styles.submitBtn} onPress={() => handleSubmit(name, quantity, price, expDate, navigation)}>
        <Text style={styles.submitBtnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const handleSubmit = (name, quantity, price, expDate, navigation) => {
  // TODO: Add item to pantry
  navigation.navigate('Home');
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
    borderWidth: 1,
    borderRadius: 10
  },
  submitBtnText: {
    fontSize: 16,
    color:'#fff',
    padding: 8,
    letterSpacing: 2
  }
});