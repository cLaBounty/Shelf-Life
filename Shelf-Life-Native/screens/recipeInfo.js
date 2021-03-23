import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView } from 'react-native';

import styles from '../Style'


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
      <StatusBar style="black" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>
			<ScrollView style={recipeInfoStyles.scrollable}>
				<Image source={{uri: image}} style={recipeInfoStyles.foodImage}/>
				<Text style={styles.text}>{dispName}</Text>
				<Text style={styles.text}>{desc}</Text>
				{amounts(quantity, ingredients)}
			</ScrollView>
		
		</View>
  );
}

function amounts(quantity, ingredients) {
	if (quantity.length != ingredients.length){ //Error handling
		return <Text style={styles.text}>Count mismatch. Take this one up with the devs.</Text>
	}

	i = -1 //Yes I know this is a hack. Fight me. It's 2:40 AM.
	return quantity.map(data => {
		i++
		return (
			retVal = [],
			retVal.concat(
				<Text style={styles.text} key={data}>• {data}x {ingredients[i]}</Text> //Actual list output
			)
		)
	})
}



const recipeInfoStyles = StyleSheet.create({
	scrollable: {
		width: "100%",
	},
	headerImg: {
		height: 100
	},
	foodImage: {
		resizeMode: 'contain',
		width: "100%",
		height: 200,
	},
});