import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FastImage from 'react-native-fast-image'
import styles from '../Style';

import PantryNav from './pantryNav';
import RecipeNav from './recipeNav';
import NutritionScreen from './nutrition';
import ExpensesScreen from './expenses';
import SettingsScreen from './settings';

const GLOBAL = require('../Globals')

export default function mainNavScreen({ navigation, route }) {
	const [username, setUsername] = useState(route.params.username);
	const Tab = createBottomTabNavigator();
	
	return (
    	<NavigationContainer independent = {true}>
			<Tab.Navigator
			tabBarOptions={{
				activeTintColor: GLOBAL.ACCENT_COLOR,
				inactiveTintColor: inactiveTintColor,
			}}
			>

			<Tab.Screen name="Pantry" component={PantryNav}
								options={{
									tabBarIcon: () => {
										return (
											<FastImage style={mainNavStyles.tabIcons} 
												source = {Image.resolveAssetSource(require('../assets/pantry.png'))}
											/>
										)
									}
								}}
							/>

							<Tab.Screen name="Recipes" component={RecipeNav}
								options={{
									tabBarIcon: () => {
										return (
											<FastImage style={mainNavStyles.tabIcons} 
												source = {Image.resolveAssetSource(require('../assets/recipes.png'))}
											/>
										)
									}
								}}
							/>

							<Tab.Screen name="Nutrition" component={NutritionScreen}
								options={{
									tabBarIcon: () => {
										return (
											<FastImage style={mainNavStyles.tabIcons} 
												source = {Image.resolveAssetSource(require('../assets/nutrition.png'))}
											/>
										)
									}
								}}
							/>

							<Tab.Screen name="Expenses" component={ExpensesScreen}
								options={{
									tabBarIcon: () => {
										return (
											<FastImage style={mainNavStyles.tabIcons} 
												source = {Image.resolveAssetSource(require('../assets/expenses.png'))}
											/>
										)
									}
								}}
							/>

				<Tab.Screen name={`Settings`} component={SettingsScreen} 
			 	listeners={({ navigation, route }) => ({
	                tabPress: e => {
	                	navigation.navigate('Settings', {username: username})
					}})} 
				options={{
					tabBarIcon: (focused) => {
						return (
							<FastImage style={mainNavStyles.tabIcons} 
								source = {Image.resolveAssetSource(require('../assets/settings.png'))}
							/>
						)
					}}}
				/>

     	 	</Tab.Navigator>
		</NavigationContainer>
	);
}

const inactiveTintColor = "#888"
const iconSize = 40;

const mainNavStyles = StyleSheet.create({
	tabIcons: {
		width: iconSize,
		height: iconSize,
		tintColor: GLOBAL.ACCENT_COLOR
	},
	active: {
		tintColor: GLOBAL.ACCENT_COLOR
	},
	inactive: {
		tintColor: inactiveTintColor
	},
})