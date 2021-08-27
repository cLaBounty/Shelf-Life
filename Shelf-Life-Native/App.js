import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/login';
import mainNavScreen from './screens/mainNav';

const Stack = createStackNavigator();


export default function App() {
	console.disableYellowBox = true;
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
				<Stack.Screen name="mainNav" component={mainNavScreen} options={{ headerShown: false, gestureEnabled: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}