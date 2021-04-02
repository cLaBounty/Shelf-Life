import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RecipeScreen from './recipes';
import RecipeInfoScreen from './recipeInfo';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent = {true}>
      <Stack.Navigator>
        <Stack.Screen name="Recipes" component={RecipeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Recipe Info" component={RecipeInfoScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}