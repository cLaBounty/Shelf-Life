import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../Style'

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