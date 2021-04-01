import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from '../Style';

import PantryScreen from './pantry';
import RecipesScreen from './recipes';
import NutritionScreen from './nutrition';
import ExpensesScreen from './expenses';
import SettingsScreen from './settings';

export default function HomeScreen({ navigation, route }) {
	const [username, setUsername] = useState(route.params.username);
	const Tab = createBottomTabNavigator();
	
	return (
    	<NavigationContainer independent = {true}>
			<Tab.Navigator
			tabBarOptions={{
				activeTintColor: activeTintColor,
				inactiveTintColor: inactiveTintColor,
			}}
			>

				<Tab.Screen name="Pantry" component={PantryScreen}
				options={{
					tabBarIcon: () => {
						return (
							<Image style={homeStyles.tabIcons} source={require('../assets/pantry.png')} />
					)}}}
				/>

				<Tab.Screen name="Recipes" component={RecipesScreen}
				options={{
					tabBarIcon: () => {
						return (
							<Image style={homeStyles.tabIcons} source={require('../assets/recipes.png')} />
					)}}}
				/>

				<Tab.Screen name="Nutrition" component={NutritionScreen}
				options={{
					tabBarIcon: () => {
					    return (
							<Image style={homeStyles.tabIcons} source={require('../assets/nutrition.png')} />
					)}}}
				/>

				<Tab.Screen name="Expenses" component={ExpensesScreen}
				options={{
					tabBarIcon: () => {
					    return (
							<Image style={homeStyles.tabIcons} source={require('../assets/expenses.png')} />
					)}}}
				/>

				<Tab.Screen name={`Settings`} component={SettingsScreen} 
			 	listeners={({ navigation, route }) => ({
	                tabPress: e => {
	                	navigation.navigate('Settings', {username: username})
					}})} 
				options={{
					tabBarIcon: (focused) => {
						return (
							<Image style={[homeStyles.tabIcons]} source={require('../assets/settings.png')} />
						)
					}}}
				/>

     	 	</Tab.Navigator>
		</NavigationContainer>
	);
}


const activeTintColor = "#ff4444"
const inactiveTintColor = "#888"
const iconSize = 40;
const tint = "#888"

const homeStyles = StyleSheet.create({
	tabIcons: {
		width: iconSize,
		height: iconSize,
		tintColor: activeTintColor
	},
	active: {
		tintColor: activeTintColor
	},
	inactive: {
		tintColor: inactiveTintColor
	},
})