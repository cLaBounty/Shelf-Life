import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Image } from 'react-native';
import { Pages } from 'react-native-pages';

const recipesJSON = require('../assets/recipeTest.json')

export default function RecipesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>


			<View style={styles.pageStyle}>
			<Pages>
        <View>
					<Text style={styles.header}>Recipes</Text>
					<ScrollView style={styles.scrollable}>
						{recipeList()}
					</ScrollView>
				</View>                     
        <View> 
					<Text style={styles.header}>Favorites</Text>
				</View>
      </Pages>
			</View>
    </View>
  );
}


recipeList = () => {
	output = recipesJSON.recipes.map((data) => {
		return (
			retVal = [],
			retVal.concat(
				
				<View style={styles.listItem}>
					<Text style={styles.listItemName} numberOfLines={1} ellipsizeMode = 'tail'>{data.dispName}</Text>
				
					<View style={styles.listItemText, styles.listLower}>
						<Image source={require('../assets/unknown.jpg')} style={styles.thumbnail} />
						<Text style={styles.listItemDesc} numberOfLines={6} ellipsizeMode = 'tail'>{data.desc}</Text>
				
					</View>
				</View>
			)
			
		)
	})
	return (output)
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    opacity: 0.50
  },
	scrollable: {
		width: '100%',
		height: '80%',
		borderWidth: 3,
		borderColor: "#00000000",
	},
  header: {
    fontSize: 50,
    color: '#fff',
		width:"100%",
		backgroundColor: "#11111166",
		textAlign: "center",
		paddingTop: 5,
		marginTop: 25,
    overflow: "hidden",
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
		justifyContent:"flex-start"
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
		backgroundColor: "red",
		borderWidth: 3,
		borderColor: "#00000000",
		borderRadius: 10,
	},
	listLower: {
		flex: 10,
		flexDirection: "row",
	}
});