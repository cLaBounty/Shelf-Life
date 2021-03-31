import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
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

        <Stack.Screen name="Add Item" component={AddItemScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Scan Item" component={ScanItemScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Item Information" component={ItemInfoScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Pantry" component={PantryScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Recipes" component={RecipesScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Recipe Information" component={RecipeInfoScreen} options={{ headerShown: true }} />				
        <Stack.Screen name="Nutrition" component={NutritionScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Expenses" component={ExpensesScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );  
}