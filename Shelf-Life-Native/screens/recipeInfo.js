import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';


export default function RecipeInfoScreen({ navigation, route }) {
	const [name, setName] = useState(route.params.recipeName);
	const [dispName, setDispName] = useState(route.params.recipeDispName);
	const [desc, setDesc] = useState(route.params.recipeDesc);
	const [ingredients, setIngredients] = useState(route.params.recipeIngredients);
	const [quantity, setQuantity] = useState(route.params.recipeQuantity);
	const [favorite, setFavorite] = useState(route.params.recipeFavorite);
	const [image, setImage] = useState(route.params.recipeImage);
	
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>

      {/* Temporary */}
      <Text style={styles.text}>Recipe Info Screen for "{dispName}"</Text>
			<Text style={styles.text}>Name: {name}</Text>
			<Text style={styles.text}>Display Name: {dispName}</Text>
			<Text style={styles.text}>Ingredients: {ingredients}</Text>
			<Text style={styles.text}>Quantity: {quantity}</Text>
			<Text style={styles.text}>Favorite: {favorite}</Text>
			<Text style={styles.text}>Image: {image}</Text>
			<Text style={styles.text}>Description: {desc}</Text>
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