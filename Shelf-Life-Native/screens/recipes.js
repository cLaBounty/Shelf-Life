import React,  { useState, useEffect } from 'react'; 
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CachedImage from '../components/CachedImage'
import FastImage from 'react-native-fast-image'
import { SearchBar } from 'react-native-elements';

import styles from '../Style'

const TopTab = createMaterialTopTabNavigator();
GLOBAL = require('../Globals')

export default function RecipesScreen({ navigation }) {
	const [searchQ, setSearchQ] = useState("");
	[favorite, setFavorite] = useState("false");

	[setJustFavorited, justFavoirted] = useState(false);
	[recipesJSON, setRecipesJSON] = useState(require('../assets/recipeTest.json'))
	useEffect(() => {
		(async () => {
		  const data = await getCookableRecipes()    		  
		  setRecipesJSON(data)
		  	
		})();
	  }, []);

	useFocusEffect(
		React.useCallback(() => {
			if (GLOBAL.favStateChanged == true)
			{
				GLOBAL.favStateChanged = false
				GLOBAL.recipe.favorite = GLOBAL.favStatus
				setFavorite({...favorite,[GLOBAL.favRecipeIndex]:GLOBAL.favStatus})

				//TODO: Sync with server (There's another place that needs syncing below)
			}
		}
	))

	return (
		<SafeAreaView style={styles.safeArea}>
		<View style={styles.container}>
			<StatusBar style="black" />
			<View style={recipeStyles.maxer}>

			<SearchBar
				placeholder="Search recipes"
				onChangeText={updateSearch}
				value={searchQ}
				containerStyle={recipeStyles.searchContainer}
				inputContainerStyle={styles.searchInput}
				platform={"ios"}
				cancelButtonTitle=""
				cancleButtonProps={{disabled: true}} //Doesn't seem to be working :(
			/>

			<NavigationContainer independent={true}>
				<TopTab.Navigator 
				screenOptions={({ route }) => ({
					tabBarLabel: ({ focused }) => {
						return (
							<Text style={recipeStyles.header}> {route.name}</Text>
							);
						},
					})}
					>
					<TopTab.Screen name="Recipes" component={recipeTab}/>
					<TopTab.Screen name="Favorite Recipes" component={favoriteTab}/>
				</TopTab.Navigator>
			</NavigationContainer>

			</View>
		</View>
	</SafeAreaView>
	);

	function masterTab(filterFunc, { navigation }, tag) { // A single func that dictates how the favorites and recipe screens are rendered
		return (
		    <View style={recipeStyles.page}>
				<CachedImage
          		source = {Image.resolveAssetSource(require('../assets/background.jpg'))}          		
				cacheKey = {`background`}
          		style={styles.background}
        		/>				

		        <ScrollView style={recipeStyles.scrollable}>
		            {getRecipes({ navigation })}
		        </ScrollView>
		    </View>
		)
	}

	function recipeTab() {
		return masterTab(getRecipes, {navigation}, "Search recipes")
	}

	function favoriteTab() {
		return masterTab(getFavorites, {navigation}, "Search favorites")
	}
	
	function updateSearch(query) {
		setSearchQ(query)
	}

	function goToScreen(data, index, {navigation}) {
		var indexStr = index.toString()
		navigation.navigate(
			'Recipe Info', { data: data, index: indexStr },
		)
	}

	// Combines all recipes into a list
	function getRecipes({ navigation }) {
		return recipesJSON.recipes.map((data, index) => {
			return (
				retVal = [],
				retVal.concat(
					recipeSeperator("recipes", data, index, { navigation })
				)
			)
		})
	}

	// Combines all favorites into a list
	function getFavorites({ navigation }) {
		return recipesJSON.recipes.map((data, index) => {
			return (
				retVal = [],
				retVal.concat(
					recipeSeperator("favorites", data, index, { navigation })
				)
			)
		})
	}

	function recipeSeperator(check, data, index, { navigation }) {
		// Filter out all recipes not wanted before it gets to compiling the output
		if (check == "favorites") {
			if (data.favorite == "false") //Filter out all non-favorites
			{
				return null
			}
		}
		
		if (data.dispName.toLowerCase().indexOf(searchQ.toLowerCase()) < 0)
		{
			return null
		}

		favorite ={...favorite,[index]:data.favorite}
		// Final output to the main function
		return (
			<View style={styleFavorite(data.favorite)} key={data.name}>
				<TouchableOpacity 
				onPress={() => goToScreen(data, index, {navigation})}
				onLongPress={() => toggleFavorite(data, index)}
				>
				<Text style={recipeStyles.listItemName} numberOfLines={2} ellipsizeMode='tail'>{data.dispName}</Text>
					<View style={recipeStyles.listItemText, recipeStyles.listLower}>
						<Image style={recipeStyles.thumbnail} source={{ uri: data.image }} />
						<Text style={recipeStyles.listItemDesc} numberOfLines={6} ellipsizeMode='tail'>{data.desc}</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
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
	
	function toggleFavorite(data, index) {
		if (data.favorite == "true") {
			data.favorite = "false"
		}
		else {
			data.favorite = "true"
		}
		setFavorite({...favorite,[index]:data.favorite})
		
		// TODO: Sync with server
	}
}

async function getCookableRecipes()
{
  recipes = null
  if (GLOBAL.LOGIN_TOKEN) {
    await fetch(GLOBAL.BASE_URL + '/api/user/pantry/recipes/matching', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "key": GLOBAL.LOGIN_TOKEN,
      })

    }).then((response) => response.json()).then((json) => {
      status = json["Status"]	  
      if (status == "OK") { // successful sign up        
        recipes = json        
      }
      else if(status == "EMPTY")
      {
		alert("No recipes that match ingredients")        
        recipes = []
      }
	  else if(status == "NO MATCHES")
	  {
		  alert("No cookable recipes")
		  recipes = []
	  }
      else{
        alert("Expired login token")    
		recipes = []
      }
    }
    );
  }
  else
  {
    alert("No login token found")
    return []
  }  
  return recipes
}

const recipeStyles = StyleSheet.create({
	maxer: {
		width: "100%",
		height: "100%",
	},
	header: {
		fontSize: 15,
	},
	page: {
		backgroundColor: "#000",
	},
	searchContainer: {
		paddingLeft:  10,
		paddingRight: 10,
	},
	scrollable: {
		width: '100%',
		height: '100%',
	},
	listItem: {
		backgroundColor: '#1116',
		marginTop: 25,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 15,
		borderWidth: 3,
		borderColor: "#0000",
		paddingLeft: 10,
		paddingTop: 10,
		paddingBottom: 10,
		justifyContent: "flex-start"
	},
	favoriteListItem: {
		backgroundColor: '#1116',
		marginTop: 25,
		marginLeft: 10,
		marginRight: 10,
		borderRadius: 15,
		borderWidth: 3,
		borderColor: GLOBAL.FAVORITE_COLOR,
		paddingLeft: 10,
		paddingTop: 10,
		paddingBottom: 10,
		justifyContent: "flex-start",
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
		backgroundColor: "#0005",
		borderWidth: 3,
		borderColor: "#0000",
		borderRadius: 10,
	},
	listLower: {
		flex: 10,
		flexDirection: "row",
	}
});