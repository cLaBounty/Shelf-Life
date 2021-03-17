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
					<Text style={styles.btnText}>Add Item</Text>
					<Image style={styles.btnImage} source={require('../assets/placeholder.png')}/>
		  		</TouchableOpacity>
		  		<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Pantry')}>
					<Text style={styles.btnText}>Pantry</Text>
					<Image style={styles.btnImage} source={require('../assets/placeholder.png')}/>
		  		</TouchableOpacity>
	  		</View>
	  		<View style={homeStyles.container}>
		  		<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Recipes')}>
					<Text style={styles.btnText}>Recipes</Text>
					<Image style={styles.btnImage} source={require('../assets/placeholder.png')}/>
		  		</TouchableOpacity>
		  		<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Nutrition')}>
					<Text style={styles.btnText}>Nutrition</Text>
					<Image style={styles.btnImage} source={require('../assets/placeholder.png')}/>
		  		</TouchableOpacity>
	  		</View>
	  		<View style={homeStyles.container}>
		  		<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Expenses')}>
					<Text style={styles.btnText}>Expenses</Text>
					<Image style={styles.btnImage} source={require('../assets/placeholder.png')}/>
		  		</TouchableOpacity>
		  		<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Settings')}>
					<Text style={styles.btnText}>Settings</Text>
					<Image style={styles.btnImage} source={require('../assets/placeholder.png')}/>
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