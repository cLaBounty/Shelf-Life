import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../Style';
import ItemEntryPage from '../components/itemEntry'

export default function ItemInfoScreen({ navigation, route }) {
  const [name, setName] = useState(route.params.itemName);
  const [quantity, setQuantity] = useState(route.params.itemQuantity);
  const [price, setPrice] = useState(route.params.itemUnitPrice);
  const [expDate, setExpDate] = useState(route.params.itemExpDate);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>
      <ItemEntryPage itemNameOfficial=""
                    itemName=""
                    category=""
                    goBack={() => navigation.goBack()}
                />
    </View>
  );
}

const handleSubmit = (name, quantity, price, expDate, navigation) => {
  // TODO: Add item to pantry
  navigation.goBack()
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