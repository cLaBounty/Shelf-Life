import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddItemScreen from './addItem';
import ScanItemScreen from './scanItem';
import ItemInfoScreen from './itemInfo';
import PantryScreen from './pantry';
import scanItem from './scanItem';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent = {true}>
      <Stack.Navigator>
        <Stack.Screen name="Pantry" component={PantryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Item Info" component={ItemInfoScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}