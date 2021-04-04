import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ScanItemScreen from './scanItem';
import ItemInfoScreen from './itemInfo';
import PantryScreen from './pantry';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent = {true}>
      <Stack.Navigator>
        <Stack.Screen name="Pantry" component={PantryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Item Info" component={ItemInfoScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Scan Item" component={ScanItemScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}