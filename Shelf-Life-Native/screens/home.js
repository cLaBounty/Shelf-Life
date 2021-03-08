import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation, route }) {
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<ImageBackground source={require('../assets/background.jpg')} style={styles.background}/>
			<Text>Hi {route.params.username}!</Text>

			{/* Temporary */}
			<Text style={styles.text}>Home Screen</Text>
			<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Add Item')}>
				<Text style={styles.btnText}>Add Item</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Pantry')}>
				<Text style={styles.btnText}>Pantry</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Recipes')}>
				<Text style={styles.btnText}>Recipes</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Nutrition')}>
				<Text style={styles.btnText}>Nutrition</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Expenses')}>
				<Text style={styles.btnText}>Expenses</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Settings')}>
				<Text style={styles.btnText}>Settings</Text>
			</TouchableOpacity>
		</View>
	);
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
	text: {
		fontSize: 24,
		color: '#fff',
		margin: 10
	},
	btn: {
		backgroundColor:'#595959',
		borderColor: '#fff',
		borderWidth: 1,
		borderRadius: 10,
		margin: 5
	},
	btnText: {
		fontSize: 14,
		color:'#fff',
		padding: 8,
		letterSpacing: 1.5
	}
});