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

            <Animated.ScrollView style={recipeInfoStyles.paralaxScroll}
						// onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: paralaxScroll } } }],
                    { useNativeDriver: true },
                )}
                scrollEventThrottle={16}
            >

								<View style={recipeInfoStyles.foodImageView}>
	                <Animated.Image source={{ uri: image }} style={recipeInfoStyles.foodImage(paralaxScroll)} />
								</View>

                <View style={recipeInfoStyles.content}>
							      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>
		                <Animated.Text style={recipeInfoStyles.header(paralaxScroll)}>{dispName}</Animated.Text>
                    <Text style={styles.text}>{desc}</Text>
                    {amounts(quantity, ingredients)}
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
            retVal.concat(
                <Text style={styles.text} key={data}>• {data}x {ingredients[i]}</Text> //Actual list output
            )
        )
    })
}


//*********************************************STYLING BEGINS HERE***********************************************//

// Constants for styling
const bannerHeight = 250
const headerFontSize = 45

// Functions for styling
function imageOpacity() { //Lessen opacity of image as user scrolls away. Gets updated by foodImage transform function
	return (
			paralaxScroll.interpolate({
		    inputRange: [0, bannerHeight],
		    outputRange: [1, 0.5],
		    extrapolate: "clamp",
		  })
	)
}


const recipeInfoStyles = StyleSheet.create({
    paralaxScroll: {
        width: "100%",
    },
    content: {
        backgroundColor: "#000000",
		    shadowOpacity: 1,
		    shadowRadius: 40,
				height: "100%",
    },
    foodImage: paralaxScroll => ({
        resizeMode: 'cover',
        width: "100%",
        height: bannerHeight - 10,
				opacity: imageOpacity(),
        transform: [
            {
                translateY: paralaxScroll.interpolate({
                    inputRange: [-bannerHeight, 0, bannerHeight, bannerHeight],
                    outputRange: [-bannerHeight / 2, 0, bannerHeight / 2, bannerHeight * 5],
                })
            },
            {
                scale: paralaxScroll.interpolate({
                    inputRange: [-bannerHeight, 0, bannerHeight, bannerHeight + 1],
                    outputRange: [bannerHeight/110, 1.3, 1, 1], // 110 seemed to work on an iPhone Xs. Further testing is advised. Just look for when black bars appear when pulling down on content overly far.
                })
						}
        ]
    }),
		header: paralaxScroll => ({
			fontSize: headerFontSize,
			color: '#fff',
			fontWeight: "bold",
			shadowOffset: {width: 0, height: 0},
	    shadowOpacity: 1,
	    shadowRadius: 3,
			transform: [
				{
					translateY: paralaxScroll.interpolate({
				    inputRange: [0, bannerHeight/2],
				    outputRange: [-headerFontSize, 0],
				    extrapolate: "clamp",
				  })
				}
			]
		}),
		
});