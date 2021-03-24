import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import styles from '../Style';

export default function HomeScreen({ navigation, route }) {
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>
			<Text style={styles.text}>Hi, {route.params.username}!</Text>
			<View style={homeStyles.container}>
		  		<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Add Item')}>
					<Image style={styles.btnImage} source={require('../assets/additem.png')}/>
					<Text style={styles.btnText}>Add Item</Text>
		  		</TouchableOpacity>
		  		<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Pantry')}>
					<Image style={styles.btnImage} source={require('../assets/pantry.png')}/>
					<Text style={styles.btnText}>Pantry</Text>
		  		</TouchableOpacity>
	  		</View>
	  		<View style={homeStyles.container}>
		  		<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Recipes')}>
				  	<Image style={styles.btnImage} source={require('../assets/recipes.png')}/>
					<Text style={styles.btnText}>Recipes</Text>
		  		</TouchableOpacity>
		  		<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Nutrition')}>
				  <Image style={styles.btnImage} source={require('../assets/nutrition.png')}/>
					<Text style={styles.btnText}>Nutrition</Text>
		  		</TouchableOpacity>
	  		</View>
	  		<View style={homeStyles.container}>
		  		<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Expenses')}>
				  	<Image style={styles.btnImage} source={require('../assets/expenses.png')}/>
					<Text style={styles.btnText}>Expenses</Text>
		  		</TouchableOpacity>
		  		<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Settings', { username: route.params.username })}>
				  	<Image style={styles.btnImage} source={require('../assets/settings.png')}/>
					<Text style={styles.btnText}>Settings</Text>
		  		</TouchableOpacity>
	  		</View>
		</View>
	);
}

const homeStyles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	}
});