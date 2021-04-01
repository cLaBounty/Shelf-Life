import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import AddItemScreen from './screens/addItem';
import ScanItemScreen from './screens/scanItem';
import ItemInfoScreen from './screens/itemInfo';
import PantryScreen from './screens/pantry';
import RecipesScreen from './screens/recipes';
import NutritionScreen from './screens/nutrition';
import ExpensesScreen from './screens/expenses';
import SettingsScreen from './screens/settings';
import RecipeInfoScreen from './screens/recipeInfo';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}