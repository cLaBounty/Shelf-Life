//import React, { useState } from 'react';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Pages } from 'react-native-pages';
import { createStackNavigator } from '@react-navigation/stack';
import styles from '../Style'

const recipesJSON = require('../assets/recipeTest.json')

export default function RecipesScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar style="black" />
            <ImageBackground source={require('../assets/background.jpg')} style={styles.background} />
		
            <View style={recipeStyles.pageStyle}>
                <Pages>
                    <View>
                        <Text style={recipeStyles.header}>Recipes</Text>
                        <ScrollView style={recipeStyles.scrollable}>
                            {getRecipes({ navigation })}
                        </ScrollView>
                    </View>
                    <View>
                        <Text style={recipeStyles.header}>Favorites</Text>
                        <ScrollView style={recipeStyles.scrollable}>
                            {getFavorites({ navigation })}
                        </ScrollView>
                    </View>
                </Pages>
            </View>
        </View>
    );
}


function toggleFavorite(data, {navigation}) {
	const forceUpdate = useForceUpdate();
	
	if (data.favorite == "true") {
    	data.favorite = "false"
    }
	else {
		data.favorite = "true"
	}
}

function goToScreen(data, {navigation}) {
	navigation.navigate('Recipe Information', { recipeName: data.name, recipeDispName: data.dispName, recipeDesc: data.desc, recipeIngredients: data.ingredients, recipeQuantity: data.quantity, recipeFavorite: data.favorite, recipeImage: data.image })
}

function recipeSeperator(check, data, { navigation }) {
    // Filter out all recipes not wanted before it gets to compiling the output
    if (check == "favorites") {
        if (data.favorite == "false") //Filter out all non-favorites
        {
            return null
        }
    }
	
    // Final output to the main function
    return (
        <View style={styleFavorite(data.favorite)} key={data.name}>
            <TouchableOpacity 
			onPress={() => goToScreen(data, {navigation})}
			onLongPress={() => toggleFavorite(data, {navigation})}
			>
                <Text style={recipeStyles.listItemName} numberOfLines={2} ellipsizeMode='tail'>{data.dispName}</Text>
                <View style={recipeStyles.listItemText, recipeStyles.listLower}>
                    <View>
                        <Image source={{ uri: data.image }} style={recipeStyles.thumbnail} />
                    </View>
                    <Text style={recipeStyles.listItemDesc} numberOfLines={6} ellipsizeMode='tail'>{data.desc}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

// Combines all recipes into a list
function getRecipes({ navigation }) {
    return recipesJSON.recipes.map(data => {
        return (
            retVal = [],
            retVal.concat(
                recipeSeperator("recipes", data, { navigation })
            )
        )
    })
}

// Combines all favorites into a list
function getFavorites({ navigation }) {
    return recipesJSON.recipes.map(data => {
        return (
            retVal = [],
            retVal.concat(
                recipeSeperator("favorites", data, { navigation })
            )
        )
    })
}

//Only style favorite recipes with pink border
function styleFavorite(favorite) {
    retVal = ""
    if (isFavorite(favorite)) {
        retVal = recipeStyles.favoriteListItem
    }
    else {
        retVal = recipeStyles.listItem
    }
    return retVal
}

// Check if it's a favorite (broken into new func for abstraction purposes)
function isFavorite(favorite) {
    retVal = false
    if (favorite == "true") {
        retVal = true
    }
    return retVal
}


const recipeStyles = StyleSheet.create({
    scrollable: {
        width: '100%',
        height: '80%',
    },
    header: {
        fontSize: 50,
        color: '#fff',
        width: "100%",
        backgroundColor: "#11111166",
        textAlign: "center",
        paddingTop: 5,
        marginTop: 25,
        overflow: "hidden",
    },
    pageStyle: {
        width: "100%",
        height: "100%",
    },
    listItem: {
        backgroundColor: '#11111166',
        marginTop: 25,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: "#00000000",
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: "flex-start"
    },
    favoriteListItem: {
        backgroundColor: '#11111166',
        marginTop: 25,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: "#fa82a7aa",
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: "flex-start"
    },
    listItemName: {
        color: "#fff",
        fontSize: 25,
        marginBottom: 10,
    },
    listItemDesc: {
        color: "#aaa",
        fontSize: 15,
        width: "64%",
    },
    thumbnail: {
        resizeMode: 'cover',
        marginTop: "auto",
        marginBottom: "auto",
        marginRight: 10,
        padding: 50,
        height: 50,
        width: 50,
        backgroundColor: "#00000055",
        borderWidth: 3,
        borderColor: "#00000000",
        borderRadius: 10,
    },
    listLower: {
        flex: 10,
        flexDirection: "row",
    }
});