import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, Animated } from 'react-native';

import styles from '../Style'

const paralaxScroll = new Animated.Value(0);

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
		    <ImageBackground source={require('../assets/background.jpg')} style={[styles.background, recipeInfoStyles.backgroundOverride]}/>
            <Animated.ScrollView style={recipeInfoStyles.paralaxScroll}
				// onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: paralaxScroll } } }],
                    { useNativeDriver: true },
                )}
                scrollEventThrottle={16}
            >
				<Animated.Image source={{ uri: image }} style={recipeInfoStyles.foodImage(paralaxScroll)} />

                <View style={[recipeInfoStyles.content, recipeInfoStyles.shadow]}>

                    <Animated.View style={[recipeInfoStyles.headerView(paralaxScroll), recipeInfoStyles.tray ]}>
                        <Text style={recipeInfoStyles.header}>{dispName}</Text>
                    </Animated.View>

					<View style={[recipeInfoStyles.tray]}>
	                    <Text style={[recipeInfoStyles.header2]}>About</Text>
						<View style={[recipeInfoStyles.tray, recipeInfoStyles.miniTray]}>
		                    <Text style={[styles.text, recipeInfoStyles.trayText]}>{desc}</Text>
						</View>
					</View>

					<View style={[recipeInfoStyles.tray]}>
	                    <Text style={[recipeInfoStyles.header2]}>Ingredients</Text>
	                    {amounts(quantity, ingredients)}
					</View>

                </View>
            </Animated.ScrollView>
        </View>
    );
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
				<View style={[recipeInfoStyles.tray, recipeInfoStyles.miniTray]}>
	                <Text style={[styles.text, recipeInfoStyles.trayText]} key={ingredient[i]}>• {count}x {ingredient}</Text>
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
		borderColor: "#00000000",
		borderRadius: 20,
		borderWidth: 1,
        overflow: "hidden",
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 5,
		paddingRight: 5,
		marginBottom: 40,
	},
	miniTray: {
		backgroundColor: "#eee",
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