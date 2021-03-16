import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Alert } from 'react-native';
import { Pages } from 'react-native-pages';
import ModalDropdown from 'react-native-modal-dropdown';

const recipes = require('../assets/recipeTest.json')

export default function RecipesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>


			<View style={styles.pageStyle}>
			<Pages>
        <View>
					<Text style={styles.header}>Noodles</Text>
						<ModalDropdown 
							options={recipes.recipes}
							textStyle={styles.type}
							dropdownStyle={styles.dropdown}
							dropdownTextStyle={styles.textDropdown}
							dropdownTextHighlightStyle={styles.textDropdownSelected}
							onSelect={this._testButton}
						/>
						<Text style={styles.header}>{Cat("Test")}</Text>
						<Text style={styles.header}>{noodleList()}</Text>
				</View>                     
        <View> 
					<Text style={styles.header}>Page 2</Text>
				</View>                     
        <View> 
					<Text style={styles.header}>Page 3</Text>
				</View>
      </Pages>
			</View>
    </View>
  );
}

const Cat = (message) => {
  return message;
};

const noodleList = (index, value) => {
	text=recipes.recipes
	return <Text>{text}</Text>
}

_testButton = (index, value) => {
	 title = "Selected recipe: " + recipes.recipes[index]
	 desc = "Available Recipes: " + recipes.[value].ingredients
	 Alert.alert(
		 title,
		 desc,
		 [
			 {
				 text: "Yay!"
			 },
		 ]
	 )
}

const noodleTypesOLD = [
	"Decorative",
	"Ribbon Cut",
	"Long",
]


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