import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, Animated, TouchableOpacity, Alert } from 'react-native';
import styles from '../Style'
import CachedImage from '../components/CachedImage'
import FastImage from 'react-native-fast-image'

GLOBAL = require('../Globals')

const paralaxScroll = new Animated.Value(0);
const pink = GLOBAL.FAVORITE_COLOR; 
const white = "#fff";

export default function RecipeInfoScreen({ route }) {
	const [favorite, setFavorite] = useState(route.params.data.favorite);
	[buttonColor, setButtonColor] = useState({pink});

	if (favorite == "true") //Setting initial border color
	{
		buttonColor = pink //Don't use setButtonColor(), it'd cause a loop
	}
	else
	{
		buttonColor = white
	}


	return (
		<View style={styles.container}>
			<StatusBar style="black" />
		<FastImage style={styles.background} 
							source = {Image.resolveAssetSource(require('../assets/background.jpg'))}
						/>
			<Animated.ScrollView style={recipeInfoStyles.paralaxScroll}
				// onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: paralaxScroll } } }],
					{ useNativeDriver: true },
				)}
				scrollEventThrottle={16}
		>
				<Animated.Image source={{ uri: route.params.data.image }} style={recipeInfoStyles.foodImage(paralaxScroll)} />

				<View style={[recipeInfoStyles.content, recipeInfoStyles.shadow]}>

					<Animated.View style={[recipeInfoStyles.headerView(paralaxScroll), recipeInfoStyles.tray, { borderColor: buttonColor }]}>
						<TouchableOpacity onLongPress={() => handleFavoriteChange()}>
							<Text style={recipeInfoStyles.header}>{route.params.data.dispName}</Text>
						</TouchableOpacity>
					</Animated.View>

					<View style={[recipeInfoStyles.tray]}>
						<Text style={[recipeInfoStyles.header2]}>About</Text>
						<View style={[recipeInfoStyles.tray, recipeInfoStyles.miniTray]}>
							<Text style={[styles.text, recipeInfoStyles.trayText]}>{route.params.data.desc}</Text>
						</View>
					</View>

					<View style={[recipeInfoStyles.tray]}>
						<Text style={[recipeInfoStyles.header2]}>Ingredients</Text>
						{amounts(route.params.data.quantity, route.params.data.ingredients)}
					</View>

				</View>
			</Animated.ScrollView>
		</View>	
	);
	
	
	function handleFavoriteChange() {
		GLOBAL.favStateChanged=true
		GLOBAL.favRecipeIndex=route.params.index
		GLOBAL.recipe = route.params.data
		
		if (favorite == "false")
		{
			GLOBAL.favStatus="true"
			setFavorite("true")
			setButtonColor(pink)
		}
		else {
			GLOBAL.favStatus="false"
			setFavorite("false")
			setButtonColor(white)
		}
	}
}

function amounts(quantity, ingredients) {
	if (quantity.length != ingredients.length) { //Error handling
		return <Text style={styles.text}>Count mismatch. Take this one up with the devs.</Text>
	}

	i = -1 //Yes I know this is a hack. Fight me. It's 2:40 AM.
	return quantity.map(data => {
		i++
		return (
			retVal = [],

			count = quantity[i],
			ingredient = ingredients[i],
			retVal.concat(
				<View style={[recipeInfoStyles.tray, recipeInfoStyles.miniTray]} key={ingredient[i]}>
					<Text style={[styles.text, recipeInfoStyles.trayText]}>• {count}x {ingredient}</Text>
				</View>
			)
		)
	})
}


//*********************************************STYLING BEGINS HERE***********************************************//

// Constants for styling
const bannerHeight = 250
const headerFontSize = 40

const recipeInfoStyles = StyleSheet.create({
	backgroundOverride: {
		opacity: 1
	},
	shadow: {
		shadowOpacity: 1,
		shadowRadius: 50,
	},
	paralaxScroll: {
		width: "100%",
	},
	content: {
		marginBottom: 50,
		height: "100%",
	},
	header: {
		fontSize: headerFontSize,
		textAlign: 'center',
		fontWeight: "bold",
	},
	header2: {
		fontSize: headerFontSize * 0.75,
		color: '#000',
		fontWeight: "bold",
		marginLeft: 8,
		marginBottom: 12,
	},
	headerView: paralaxScroll => ({
		width: "100%",
		overflow: "hidden",
		transform: [
			{
				translateY: paralaxScroll.interpolate({
					inputRange: [-bannerHeight, 0, bannerHeight],
					outputRange: [-220, -20 , 0],
				})}]
	}),
	tray:{
		backgroundColor: "#fff",
		borderRadius: 20,
		borderWidth: 3,
		borderColor: "#00000000",
		overflow: "hidden",
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 5,
		paddingRight: 5,
		marginBottom: 40,
	},
	miniTray: {
		backgroundColor: "#eee",
		borderColor: "#00000000",
		marginBottom: 0,
		marginTop: 3,
		paddingTop: 4,
		paddingBottom: 2,
	},
	trayText: {
		color: "#000",
		fontSize: 19,
		marginLeft: 10
	},
	foodImage: paralaxScroll => ({
		resizeMode: 'cover',
		width: "100%",
		height: bannerHeight,
		marginTop: 29,
		backgroundColor: "#000",
		transform: [
			{
				translateY: paralaxScroll.interpolate({
					inputRange: [-bannerHeight, 0, bannerHeight],
					outputRange: [-245, -20 , 40],
				})
			},
			{
				scale: paralaxScroll.interpolate({
					inputRange: [-bannerHeight, 0, bannerHeight],
					outputRange: [1.3, 1.1, 1], //Starts at 110% scale, and shrink to 100%.
				})}
		]
	}),
});