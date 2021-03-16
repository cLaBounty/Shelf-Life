import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Alert } from 'react-native';
import { Pages } from 'react-native-pages';

const recipes = require('../assets/recipeTest.json')

export default function RecipesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>


			<View style={styles.pageStyle}>
			<Pages>
        <View>
					<Text style={styles.header}>Recipes</Text>
					
				</View>                     
        <View> 
					<Text style={styles.header}>Favorites</Text>
				</View>
      </Pages>
			</View>
    </View>
  );
}

recipeList = (index, value) => {
	text=recipes.recipes
	return <Text>{text}</Text>
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
  header: {
    fontSize: 50,
    color: '#fff',
		width:"100%",
		backgroundColor: "#11111166",
		textAlign: "center",
		paddingTop: 5,
		marginTop: 25,
    overflow: "hidden"
  },
	type: {
		fontSize: 25,
		color: "#fff",
		backgroundColor: "#11111166",
		textAlign: "center",
		paddingBottom: 5,
		width: "100%",
	},
	pageStyle: {
		width: "100%",
		height: "100%",
	},
	dropdown:{
		width:"100%",
		backgroundColor: "#11111100",
		paddingTop: 5,
    overflow: "hidden",
		borderWidth: 0,
	},
	textDropdown: {
    fontSize: 25,
		color: "#fff",
		backgroundColor: "#11111166",
		textAlign: "center",
		paddingTop: 5,
	},
	textDropdownSelected: {
    fontSize: 25,
		color: "#fff",
		backgroundColor: "#55551166",
		textAlign: "center",
	}
});